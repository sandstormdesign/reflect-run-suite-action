import axios from "axios";
import core from "@actions/core";
import yaml from "js-yaml";

try {
  // Get input values
  const apiKey = core.getInput("api-key", { required: true });
  const suiteId = core.getInput("suite-id", { required: true });
  const variables = yaml.load(core.getInput("variables")) || {};
  const waitForCompletion = core.getBooleanInput("wait-for-completion") || true;

  // Reflect API client
  const api = axios.create({
    baseURL: "https://api.reflect.run/v1",
    headers: {
      "X-API-KEY": apiKey,
    },
  });

  core.info("Scheduling the test suite for immediate execution...");

  // Schedule the test
  const response = await api.post(`suites/${suiteId}/executions`, {
    variables,
  });

  core.info("Running the test suite...");

  // Get the execution ID
  const { executionId } = response.data;

  if (waitForCompletion) {
    core.info("Waiting for test suite completion...");
  }

  // Loop until the execution is complete
  while (true) {
    // Fetch the latest execution status
    const { data: execution } = await api.get(`suites/${suiteId}/executions/${executionId}`);

    // Check if we're skipping the wait
    if (!waitForCompletion) {
      core.setOutput("execution", execution);
      break;
    }

    // Check if every test has been run
    if (execution.isFinished) {
      // Check for a failed test
      const failed = execution.status === "failed";

      if (failed) {
        core.setFailed(
          `Test suite failed. Results: https://app.reflect.run/suites/${suiteId}/executions/${executionId}`
        );
      } else {
        core.info("Test suite completed successfully.");
        core.setOutput("execution", execution);
      }

      break;
    }

    // Wait for 10 seconds before checking again
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
} catch (error) {
  core.setFailed(error.message);
}
