---
tags:
- RandomGeneration
- Seed
---

# Seed (rgthree)
## Documentation
- Class name: `Seed (rgthree)`
- Category: `rgthree`
- Output node: `False`

The Seed node is designed to manage and generate random seeds for operations, ensuring reproducibility and uniqueness in processes that require randomization. It can return a predefined seed, generate a new random seed, or modify the seed based on specific conditions, while also handling metadata updates related to seed information.
## Input types
### Required
- **`seed`**
    - The 'seed' parameter is crucial for determining the starting point of randomness. It can either use a predefined seed or trigger the generation of a new random seed, affecting the node's output and ensuring reproducibility of results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`SEED`**
    - Comfy dtype: `INT`
    - Outputs the seed used or generated during the node's execution, which is essential for ensuring the reproducibility of the randomness in processes.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - PhotoMaker_Generation
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - [OneButtonPrompt](../../OneButtonPrompt/Nodes/OneButtonPrompt.md)



## Source code
```python
class RgthreeSeed:
  """Seed node."""

  NAME = get_name('Seed')
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {
        "seed": ("INT", {
          "default": 0,
          "min": -1125899906842624,
          "max": 1125899906842624
        }),
      },
      "hidden": {
        "prompt": "PROMPT",
        "extra_pnginfo": "EXTRA_PNGINFO",
        "unique_id": "UNIQUE_ID",
      },
    }

  RETURN_TYPES = ("INT",)
  RETURN_NAMES = ("SEED",)
  FUNCTION = "main"

  def main(self, seed=0, prompt=None, extra_pnginfo=None, unique_id=None):
    """Returns the passed seed on execution."""

    # We generate random seeds on the frontend in the seed node before sending the workflow in for
    # many reasons. However, if we want to use this in an API call without changing the seed before
    # sending, then users _could_ pass in "-1" and get a random seed used and added to the metadata.
    # Though, this should likely be discouraged for several reasons (thus, a lot of logging).
    if seed in (-1, -2, -3):
      log_node_warn(self.NAME,
                    f'Got "{seed}" as passed seed. ' +
                    'This shouldn\'t happen when queueing from the ComfyUI frontend.',
                    msg_color="YELLOW")
      if seed in (-2, -3):
        log_node_warn(self.NAME,
                      f'Cannot {"increment" if seed == -2 else "decrement"} seed from ' +
                      'server, but will generate a new random seed.',
                      msg_color="YELLOW")

      original_seed = seed
      seed = new_random_seed()
      log_node_info(self.NAME, f'Server-generated random seed {seed} and saving to workflow.')
      log_node_warn(
        self.NAME,
        'NOTE: Re-queues passing in "{seed}" and server-generated random seed won\'t be cached.',
        msg_color="YELLOW")

      if unique_id is None:
        log_node_warn(
          self.NAME, 'Cannot save server-generated seed to image metadata because ' +
          'the node\'s id was not provided.')
      else:
        if extra_pnginfo is None:
          log_node_warn(
            self.NAME, 'Cannot save server-generated seed to image workflow ' +
            'metadata because workflow was not provided.')
        else:
          workflow_node = next(
            (x for x in extra_pnginfo['workflow']['nodes'] if x['id'] == int(unique_id)), None)
          if workflow_node is None or 'widgets_values' not in workflow_node:
            log_node_warn(
              self.NAME, 'Cannot save server-generated seed to image workflow ' +
              'metadata because node was not found in the provided workflow.')
          else:
            for index, widget_value in enumerate(workflow_node['widgets_values']):
              if widget_value == original_seed:
                workflow_node['widgets_values'][index] = seed

        if prompt is None:
          log_node_warn(
            self.NAME, 'Cannot save server-generated seed to image API prompt ' +
            'metadata because prompt was not provided.')
        else:
          prompt_node = prompt[str(unique_id)]
          if prompt_node is None or 'inputs' not in prompt_node or 'seed' not in prompt_node[
              'inputs']:
            log_node_warn(
              self.NAME, 'Cannot save server-generated seed to image workflow ' +
              'metadata because node was not found in the provided workflow.')
          else:
            prompt_node['inputs']['seed'] = seed

    return (seed,)

```
