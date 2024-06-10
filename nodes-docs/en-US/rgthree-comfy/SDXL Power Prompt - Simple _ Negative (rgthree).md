---
tags:
- Prompt
- PromptStyling
---

# SDXL Power Prompt - Simple / Negative (rgthree)
## Documentation
- Class name: `SDXL Power Prompt - Simple _ Negative (rgthree)`
- Category: `rgthree`
- Output node: `False`

This node provides a simplified version of the SDXL Power Prompt specifically designed for negative conditioning scenarios. It streamlines the process by not loading Loras, making it more efficient for cases where negative prompts are required.
## Input types
### Required
- **`prompt_g`**
    - The global prompt used for generating or conditioning the output. It plays a crucial role in guiding the overall direction and theme of the generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prompt_l`**
    - The local prompt that specifies more detailed or localized conditions for the generation. It complements the global prompt by adding specificity to certain areas or aspects.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`opt_clip`**
    - Optional CLIP model settings to adjust the conditioning based on visual concepts.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`opt_clip_width`**
    - Specifies the width of the CLIP model's input. It's crucial for defining the dimensions of the visual concepts to be considered.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`opt_clip_height`**
    - Specifies the height of the CLIP model's input. It's essential for determining the dimensions of the visual concepts to be analyzed.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`insert_embedding`**
    - Allows the insertion of pre-defined embeddings into the prompt, enhancing the conditioning with additional context or information.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`insert_saved`**
    - Enables the inclusion of saved prompts, providing a way to reuse previously successful or preferred prompt configurations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`target_width`**
    - Defines the target width for the output, allowing for specific dimension requirements to be set.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_height`**
    - Defines the target height for the output, enabling precise dimension specifications for the generated content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_width`**
    - Determines the width of the crop area, which can be used to focus the generation on a specific part of the visual concept.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_height`**
    - Specifies the height of the crop area, allowing for targeted focus within the visual concept for the generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`CONDITIONING`**
    - Comfy dtype: `CONDITIONING`
    - The conditioning output that combines global and local prompts with optional parameters to guide the generation process.
    - Python dtype: `tuple`
- **`TEXT_G`**
    - Comfy dtype: `STRING`
    - The global prompt used for the generation, returned as part of the output for reference.
    - Python dtype: `str`
- **`TEXT_L`**
    - Comfy dtype: `STRING`
    - The local prompt used for the generation, returned as part of the output for reference.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeSDXLPowerPromptSimple(RgthreeSDXLPowerPromptPositive):
  """A simpler SDXL Power Prompt that doesn't handle Loras."""

  NAME = NODE_NAME
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    saved_prompts_files = folder_paths.get_filename_list('saved_prompts')
    saved_promptes_content = []
    for fname in saved_prompts_files:
      with open(folder_paths.get_full_path('saved_prompts', fname), 'r', encoding="utf-8") as file:
        saved_promptes_content.append(file.read())

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
        'insert_embedding': ([
          'CHOOSE',
        ] + [os.path.splitext(x)[0] for x in folder_paths.get_filename_list('embeddings')],),
        'insert_saved': ([
          'CHOOSE',
        ] + saved_prompts_files,),
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
        'values_insert_saved': (['CHOOSE'] + saved_promptes_content,),
      }
    }

  RETURN_TYPES = ('CONDITIONING', 'STRING', 'STRING')
  RETURN_NAMES = ('CONDITIONING', 'TEXT_G', 'TEXT_L')
  FUNCTION = 'main'

  def main(self,
           prompt_g,
           prompt_l,
           opt_clip=None,
           opt_clip_width=None,
           opt_clip_height=None,
           insert_embedding=None,
           insert_saved=None,
           target_width=-1,
           target_height=-1,
           crop_width=-1,
           crop_height=-1,
           values_insert_saved=None):

    conditioning = self.get_conditioning(prompt_g, prompt_l, opt_clip, opt_clip_width,
                                         opt_clip_height, target_width, target_height, crop_width, crop_height)
    return (conditioning, prompt_g, prompt_l)

```
