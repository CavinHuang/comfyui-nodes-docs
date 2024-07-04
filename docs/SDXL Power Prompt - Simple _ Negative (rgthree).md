
# Documentation
- Class name: SDXL Power Prompt - Simple _ Negative (rgthree)
- Category: rgthree
- Output node: False

该节点提供了SDXL Power Prompt的简化版本，专门设计用于负面条件场景。它通过不加载Loras来简化流程，使其在需要负面提示的情况下更加高效。

# Input types
## Required
- prompt_g
    - 用于生成或调节输出的全局提示。它在引导生成的整体方向和主题方面起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt_l
    - 指定生成更详细或局部条件的本地提示。它通过为某些区域或方面添加具体细节来补充全局提示。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- opt_clip
    - 可选的CLIP模型设置，用于根据视觉概念调整条件。
    - Comfy dtype: CLIP
    - Python dtype: str
- opt_clip_width
    - 指定CLIP模型输入的宽度。对于定义要考虑的视觉概念的尺寸至关重要。
    - Comfy dtype: INT
    - Python dtype: float
- opt_clip_height
    - 指定CLIP模型输入的高度。对于确定要分析的视觉概念的尺寸至关重要。
    - Comfy dtype: INT
    - Python dtype: float
- insert_embedding
    - 允许将预定义的嵌入插入到提示中，通过附加上下文或信息来增强调节。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- insert_saved
    - 允许包含已保存的提示，提供一种重用先前成功或首选提示配置的方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- target_width
    - 定义输出的目标宽度，允许设置特定的尺寸要求。
    - Comfy dtype: INT
    - Python dtype: int
- target_height
    - 定义输出的目标高度，使生成内容能够精确指定尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- crop_width
    - 确定裁剪区域的宽度，可用于将生成聚焦于视觉概念的特定部分。
    - Comfy dtype: INT
    - Python dtype: int
- crop_height
    - 指定裁剪区域的高度，允许在视觉概念内进行有针对性的聚焦生成。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- CONDITIONING
    - 结合全局和本地提示以及可选参数来指导生成过程的调节输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: tuple
- TEXT_G
    - 用于生成的全局提示，作为输出的一部分返回以供参考。
    - Comfy dtype: STRING
    - Python dtype: str
- TEXT_L
    - 用于生成的本地提示，作为输出的一部分返回以供参考。
    - Comfy dtype: STRING
    - Python dtype: str


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
