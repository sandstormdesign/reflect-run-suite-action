# Reflect Run Test Action

This action runs a Reflect (https://reflect.run) test.

## Inputs

### `api-key`

**Required** Your Reflect API key (https://app.reflect.run/settings/account).

### `suite-id`

**Required** The ID of the test suite to run.

### `variables`

A YAML document of `key: value` variable overrides to apply to this scheduled execution.

### `wait-for-completion`

Wait for the test suite to complete before continuing.

default: `true`

## Outputs

### `execution`

A JSON object containing the execution details.

```json
{
  "suiteId": "regression-tests",
  "executionId": 36,
  "overrides": {
    "hostnames": [
      {
        "original": "prod.myapp.com",
        "replacement": "staging.myapp.com"
      }
    ]
  },
  "gitHub": {
    "owner": "repository-owner",
    "repo": "my-repository-name",
    "sha": "0f4212320f2cb6734583ebef3a4928d78d4f3fde"
  },
  "url": "https://app.reflect.run/suites/regression-tests/executions/36",
  "isFinished": true,
  "status": "passed",
  "tests": {
    "data": [
      {
        "instanceId": 0,
        "testId": 683,
        "actionName": "run-tests-1",
        "startingUrl": "https://staging.myapp.com/test-one",
        "status": "passed",
        "runs": [
          {
            "runId": 2641,
            "browser": "Chrome",
            "status": "passed",
            "variables": {},
            "startTime": 1643734963077,
            "endTime": 1643734979203,
            "runTime": 16126,
            "timestamp": 1643734979647,
            "videoUrl": "https://reflect-videos.s3.amazonaws.com/2641_969e.mp4",
            "stepCount": 14
          }
        ]
      },
      {
        "instanceId": 1,
        "testId": 686,
        "startingUrl": "https://staging.myapp.com/test-two",
        "status": "passed",
        "runs": [
          {
            "runId": 2642,
            "browser": "Chrome",
            "status": "passed",
            "variables": {},
            "startTime": 1643734994863,
            "endTime": 1643735012070,
            "runTime": 17207,
            "timestamp": 1643735012534,
            "videoUrl": "https://reflect-videos.s3.amazonaws.com/2641_89f7.mp4",
            "stepCount": 9
          }
        ]
      },
      {
        "instanceId": 2,
        "testId": 688,
        "startingUrl": "https://staging.myapp.com/test-three",
        "status": "failed",
        "runs": [
          {
            "runId": 2643,
            "browser": "Chrome",
            "status": "failed",
            "variables": {},
            "startTime": 1643734996842,
            "endTime": 1643735012095,
            "runTime": 15253,
            "timestamp": 1643735012539,
            "videoUrl": "https://reflect-videos.s3.amazonaws.com/2641_4e95.mp4",
            "stepCount": 6,
            "failedStepIndex": {
              "4": "Visual Observe Failed - image difference exceeds limit",
              "5": "Element Selection Failed"
            }
          }
        ]
      }
    ],
    "bookmark": ""
  }
}
```

## Example usage

```yaml
name: Run a Relfect test
uses: sandstormdesign/reflect-run-suite-action@main
with:
  api-key: ${{ secrets.REFLECT_DOT_RUN_API_KEY }}
  suite-id: test-suite
  variables: |
    FOO: bar
    BAZ: qux
  wait-for-completion: true
```
