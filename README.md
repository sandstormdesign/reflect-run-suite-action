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
  "executionId": 17671,
  "browser": "Edge",
  "tests": [
    {
      "testId": 1690,
      "status": "succeeded",
      "run": {
        "runId": 690,
        "status": "passed",
        "variables": {},
        "startTime": 1654632014295,
        "endTime": 1654632027297,
        "runTime": 13002,
        "videoUrl": "https://reflect-videos.s3.amazonaws.com/690_89f4.mp4"
      }
    }
  ]
}
```

## Example usage

```yaml
name: Run a Relfect test
uses: sandstormdesign/reflect-run-suite-action@main
with:
  api-key: ${{ secrets.REFLECT_API_KEY }}
  suite-id: 1690
  variables: |
    FOO: bar
    BAZ: qux
  wait-for-completion: true
```
