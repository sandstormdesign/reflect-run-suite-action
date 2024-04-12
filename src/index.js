import axios from "axios";
import core from "@actions/core";
import yaml from "js-yaml";

try {
  // Get input values
  const apiKey = core.getInput("api-key", { required: true });
  const testId = core.getInput("test-id", { required: true });
  const variables = yaml.load(core.getInput("variables")) || {};
  const waitForCompletion = core.getBooleanInput("wait-for-completion");

  // Reflect API client
  const api = axios.create({
    baseURL: "https://api.reflect.run/v1",
    headers: {
      "X-API-KEY": apiKey,
    },
  });

  // Schedule the test
  const response = await api.post(`tests/${testId}/executions`, {
    variables,
  });

  // Get the execution ID
  const { executionId } = response.data;

  // Loop until the execution is complete
  while (true) {
    // Fetch the latest execution status
    const { data: execution } = await api.get(`executions/${executionId}`);

    // Check if we're skipping the wait, or if all tests have been run
    if (!waitForCompletion || execution.tests.every((test) => test.run)) {
      // Set the output
      core.setOutput("execution", execution);

      // Exit the loop
      break;
    }

    // Wait for 10 seconds before checking again
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
} catch (error) {
  core.setFailed(error.message);
}
