---
tags:
- Prompt
- PromptStyling
---

# SDXL Power Prompt - Positive (rgthree)
## Documentation
- Class name: `SDXL Power Prompt - Positive (rgthree)`
- Category: `rgthree`
- Output node: `False`

This node is designed for positive conditioning in text generation, utilizing advanced techniques such as Lora tags for enhanced customization and control over the generated content. It integrates with CLIPTextEncodeSDXL for semantic understanding and optimization of prompts.
## Input types
### Required
- **`prompt_g`**
    - The primary prompt for generation, supporting multiline input. It plays a crucial role in guiding the text generation process towards the desired positive outcome.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prompt_l`**
    - A secondary prompt, also supporting multiline input, that complements the primary prompt to refine and direct the generation towards positive conditioning.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`opt_model`**
    - An optional model parameter that allows for further customization and control over the text generation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`opt_clip`**
    - An optional CLIP parameter that can be used to enhance the semantic understanding of the prompts.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`opt_clip_width`**
    - Specifies the width for the CLIP encoding process, enhancing the conditioning's focus.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`opt_clip_height`**
    - Specifies the height for the CLIP encoding process, refining the conditioning's scope.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`insert_lora`**
    - Allows the insertion of Lora tags for advanced customization and control over the generated content.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`insert_embedding`**
    - Enables the inclusion of specific embeddings to influence the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`insert_saved`**
    - Permits the use of saved prompts to guide the generation, offering a way to reuse successful configurations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`target_width`**
    - The target width for the generated content, affecting the output's dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_height`**
    - The target height for the generated content, impacting the output's scale.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_width`**
    - Defines the width of the crop area for the CLIP encoding, focusing the analysis.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_height`**
    - Defines the height of the crop area for the CLIP encoding, concentrating the examination.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`CONDITIONING`**
    - Comfy dtype: `CONDITIONING`
    - The output conditioning data used for text generation.
    - Python dtype: `str`
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The model used in the generation process, if any.
    - Python dtype: `str`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The CLIP data used for enhancing the prompts, if any.
    - Python dtype: `str`
- **`TEXT_G`**
    - Comfy dtype: `STRING`
    - The primary generated text output.
    - Python dtype: `str`
- **`TEXT_L`**
    - Comfy dtype: `STRING`
    - The secondary generated text output.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeSDXLPowerPromptPositive:
  """The Power Prompt for positive conditioning."""

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
        'prompt_g': ('STRING', {
          'multiline': True
        }),
        'prompt_l': ('STRING', {
          'multiline': True
        }),
      },
      'optional': {
        "opt_model": ("MODEL",),
        "opt_clip": ("CLIP",),
        "opt_clip_width": ("INT", {
          "forceInput": True,
          "default": 1024.0,
          "min": 0,
          "max": MAX_RESOLUTION
        }),
        "opt_clip_height": ("INT", {
          "forceInput": True,
          "default": 1024.0,
          "min": 0,
          "max": MAX_RESOLUTION
        }),
        'insert_lora': (['CHOOSE', 'DISABLE LORAS'] +
                        [os.path.splitext(x)[0] for x in folder_paths.get_filename_list('loras')],),
        'insert_embedding': ([
          'CHOOSE',
        ] + [os.path.splitext(x)[0] for x in folder_paths.get_filename_list('embeddings')],),
        'insert_saved': ([
          'CHOOSE',
        ] + SAVED_PROMPTS_FILES,),
        # We'll hide these in the UI for now.
        "target_width": ("INT", {
          "default": -1,
          "min": -1,
          "max": MAX_RESOLUTION
        }),
        "target_height": ("INT", {
          "default": -1,
          "min": -1,
          "max": MAX_RESOLUTION
        }),
        "crop_width": ("INT", {
          "default": -1,
          "min": -1,
          "max": MAX_RESOLUTION
        }),
        "crop_height": ("INT", {
          "default": -1,
          "min": -1,
          "max": MAX_RESOLUTION
        }),
      },
      'hidden': {
        'values_insert_saved': (['CHOOSE'] + SAVED_PROMPTS_CONTENT,),
      }
    }

  RETURN_TYPES = ('CONDITIONING', 'MODEL', 'CLIP', 'STRING', 'STRING')
  RETURN_NAMES = ('CONDITIONING', 'MODEL', 'CLIP', 'TEXT_G', 'TEXT_L')
  FUNCTION = 'main'

  def main(self,
           prompt_g,
           prompt_l,
           opt_model=None,
           opt_clip=None,
           opt_clip_width=None,
           opt_clip_height=None,
           insert_lora=None,
           insert_embedding=None,
           insert_saved=None,
           target_width=-1,
           target_height=-1,
           crop_width=-1,
           crop_height=-1,
           values_insert_saved=None):

    if insert_lora == 'DISABLE LORAS':
      prompt_g, loras_g = get_and_strip_loras(prompt_g, True, log_node=self.NAME)
      prompt_l, loras_l = get_and_strip_loras(prompt_l, True, log_node=self.NAME)
      loras = loras_g + loras_l
      log_node_info(
        NODE_NAME,
        f'Disabling all found loras ({len(loras)}) and stripping lora tags for TEXT output.')
    elif opt_model != None and opt_clip != None:
      prompt_g, loras_g = get_and_strip_loras(prompt_g, log_node=self.NAME)
      prompt_l, loras_l = get_and_strip_loras(prompt_l, log_node=self.NAME)
      loras = loras_g + loras_l
      if len(loras):
        for lora in loras:
          opt_model, opt_clip = LoraLoader().load_lora(opt_model, opt_clip, lora['lora'],
                                                       lora['strength'], lora['strength'])
          log_node_success(NODE_NAME, f'Loaded "{lora["lora"]}" from prompt')
        log_node_info(NODE_NAME, f'{len(loras)} Loras processed; stripping tags for TEXT output.')
    elif '<lora:' in prompt_g or '<lora:' in prompt_l:
      _prompt_stripped_g, loras_g = get_and_strip_loras(prompt_g, True, log_node=self.NAME)
      _prompt_stripped_l, loras_l = get_and_strip_loras(prompt_l, True, log_node=self.NAME)
      loras = loras_g + loras_l
      if len(loras):
        log_node_warn(
          NODE_NAME, f'Found {len(loras)} lora tags in prompt but model & clip were not supplied!')
        log_node_info(NODE_NAME, 'Loras not processed, keeping for TEXT output.')

    conditioning = self.get_conditioning(prompt_g, prompt_l, opt_clip, opt_clip_width,
                                         opt_clip_height, target_width, target_height, crop_width,
                                         crop_height)

    return (conditioning, opt_model, opt_clip, prompt_g, prompt_l)

  def get_conditioning(self, prompt_g, prompt_l, opt_clip, opt_clip_width, opt_clip_height,
                       target_width, target_height, crop_width, crop_height):
    """Checks the inputs and gets the conditioning."""
    conditioning = None
    if opt_clip is not None:
      if opt_clip_width and opt_clip_height:
        target_width = target_width if target_width and target_width > 0 else opt_clip_width
        target_height = target_height if target_height and target_height > 0 else opt_clip_height
        crop_width = crop_width if crop_width and crop_width > 0 else 0
        crop_height = crop_height if crop_height and crop_height > 0 else 0
        conditioning = CLIPTextEncodeSDXL().encode(opt_clip, opt_clip_width, opt_clip_height,
                                                   crop_width, crop_height, target_width,
                                                   target_height, prompt_g, prompt_l)[0]
      else:
        # If we got an opt_clip, but no clip_width or _height, then use normal CLIPTextEncode
        log_node_info(
          self.NAME,
          'CLIP supplied, but not CLIP_WIDTH and CLIP_HEIGHT. Text encoding will use standard encoding with prompt_g and prompt_l concatenated.'
        )
        conditioning = CLIPTextEncode().encode(
          opt_clip, f'{prompt_g if prompt_g else ""}\n{prompt_l if prompt_l else ""}')[0]
    return conditioning

```
