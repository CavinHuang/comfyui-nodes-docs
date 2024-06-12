---
tags:
- Prompt
- PromptStyling
---

# Power Prompt (rgthree)
## Documentation
- Class name: `Power Prompt (rgthree)`
- Category: `rgthree`
- Output node: `False`

The Power Prompt node is designed to process textual prompts, potentially enhancing them with additional context or modifications before further processing. It leverages utilities for handling specific text patterns and integrates with other components for text encoding, aiming to prepare the input for more sophisticated text-to-image or text-to-text applications.
## Input types
### Required
- **`prompt`**
    - The primary text input that the node processes. It may undergo various transformations or enhancements based on the node's logic and additional parameters provided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`opt_model`**
    - An optional parameter that allows for the selection of a specific model for processing the prompt, potentially influencing the outcome based on the model's characteristics.
    - Comfy dtype: `MODEL`
    - Python dtype: `Optional[str]`
- **`opt_clip`**
    - An optional parameter that, if provided, allows for the encoding of the prompt alongside this parameter's value using a CLIP model. This can be used to generate a conditioning vector for further processing.
    - Comfy dtype: `CLIP`
    - Python dtype: `Optional[str]`
- **`insert_lora`**
    - Permits the inclusion of a LORA (Locally Optimized Receptive Attention) adjustment to the prompt, which can modify the processing behavior based on the selected LORA's attributes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Optional[str]`
- **`insert_embedding`**
    - Allows for the insertion of a pre-defined embedding into the prompt, enhancing its context or specificity for subsequent processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Optional[str]`
- **`insert_saved`**
    - Enables the inclusion of a saved prompt from a predefined list, potentially adding more depth or context to the primary prompt.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Optional[str]`
## Output types
- **`CONDITIONING`**
    - Comfy dtype: `CONDITIONING`
    - A conditioning vector generated from the prompt and optionally the 'opt_clip' parameter, using a CLIP model. This vector can be used for further processing in text-to-image or other generative tasks.
    - Python dtype: `Optional[torch.Tensor]`
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The model selected for processing the prompt, if any, which can influence the final output.
    - Python dtype: `Optional[str]`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The CLIP model used for encoding the prompt, if specified, which can affect the conditioning vector generated.
    - Python dtype: `Optional[str]`
- **`TEXT`**
    - Comfy dtype: `STRING`
    - The processed or enhanced prompt, ready for further application or processing.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreePowerPrompt:

  NAME = NODE_NAME
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    SAVED_PROMPTS_FILES = folder_paths.get_filename_list('saved_prompts')
    SAVED_PROMPTS_CONTENT = []
    for filename in SAVED_PROMPTS_FILES:
      with open(folder_paths.get_full_path('saved_prompts', filename), 'r') as f:
        SAVED_PROMPTS_CONTENT.append(f.read())
    return {
      'required': {
        'prompt': ('STRING', {
          'multiline': True
        }),
      },
      'optional': {
        "opt_model": ("MODEL",),
        "opt_clip": ("CLIP",),
        'insert_lora': (['CHOOSE', 'DISABLE LORAS'] +
                        [os.path.splitext(x)[0] for x in folder_paths.get_filename_list('loras')],),
        'insert_embedding': ([
          'CHOOSE',
        ] + [os.path.splitext(x)[0] for x in folder_paths.get_filename_list('embeddings')],),
        'insert_saved': ([
          'CHOOSE',
        ] + SAVED_PROMPTS_FILES,),
      },
      'hidden': {
        'values_insert_saved': (['CHOOSE'] + SAVED_PROMPTS_CONTENT,),
      }
    }

  RETURN_TYPES = (
    'CONDITIONING',
    'MODEL',
    'CLIP',
    'STRING',
  )
  RETURN_NAMES = (
    'CONDITIONING',
    'MODEL',
    'CLIP',
    'TEXT',
  )
  FUNCTION = 'main'

  def main(self,
           prompt,
           opt_model=None,
           opt_clip=None,
           insert_lora=None,
           insert_embedding=None,
           insert_saved=None,
           values_insert_saved=None):
    if insert_lora == 'DISABLE LORAS':
      prompt, loras = get_and_strip_loras(prompt, log_node=NODE_NAME, silent=True)
      log_node_info(
        NODE_NAME,
        f'Disabling all found loras ({len(loras)}) and stripping lora tags for TEXT output.')
    elif opt_model != None and opt_clip != None:
      prompt, loras = get_and_strip_loras(prompt, log_node=NODE_NAME)
      if len(loras):
        for lora in loras:
          opt_model, opt_clip = LoraLoader().load_lora(opt_model, opt_clip, lora['lora'],
                                                       lora['strength'], lora['strength'])
          log_node_success(NODE_NAME, f'Loaded "{lora["lora"]}" from prompt')
        log_node_info(NODE_NAME, f'{len(loras)} Loras processed; stripping tags for TEXT output.')
    elif '<lora:' in prompt:
      _prompt_stripped, loras = get_and_strip_loras(prompt, log_node=NODE_NAME, silent=True)
      if len(loras):
        log_node_warn(
          NODE_NAME, f'Found {len(loras)} lora tags in prompt but model & clip were not supplied!')
        log_node_info(NODE_NAME, 'Loras not processed, keeping for TEXT output.')

    conditioning = None
    if opt_clip != None:
      conditioning = CLIPTextEncode().encode(opt_clip, prompt)[0]

    return (conditioning, opt_model, opt_clip, prompt)

```
