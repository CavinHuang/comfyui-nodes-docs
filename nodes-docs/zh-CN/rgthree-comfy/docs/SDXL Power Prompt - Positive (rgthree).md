
# Documentation
- Class name: SDXL Power Prompt - Positive (rgthree)
- Category: rgthree
- Output node: False

这个节点专为文本生成中的正面条件设计，利用了诸如Lora标签等先进技术来增强对生成内容的定制和控制。它与CLIPTextEncodeSDXL集成，用于语义理解和优化提示。

# Input types
## Required
- prompt_g
    - 生成的主要提示，支持多行输入。在引导文本生成过程朝向所需的正面结果方面起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt_l
    - 辅助提示，也支持多行输入，补充主要提示以细化和引导生成朝向正面条件。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- opt_model
    - 可选的模型参数，允许对文本生成过程进行进一步的定制和控制。
    - Comfy dtype: MODEL
    - Python dtype: str
- opt_clip
    - 可选的CLIP参数，可用于增强对提示的语义理解。
    - Comfy dtype: CLIP
    - Python dtype: str
- opt_clip_width
    - 指定CLIP编码过程的宽度，增强条件的焦点。
    - Comfy dtype: INT
    - Python dtype: int
- opt_clip_height
    - 指定CLIP编码过程的高度，细化条件的范围。
    - Comfy dtype: INT
    - Python dtype: int
- insert_lora
    - 允许插入Lora标签，用于高级定制和控制生成内容。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- insert_embedding
    - 允许包含特定嵌入以影响生成过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- insert_saved
    - 允许使用保存的提示来引导生成，提供重用成功配置的方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- target_width
    - 生成内容的目标宽度，影响输出的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- target_height
    - 生成内容的目标高度，影响输出的比例。
    - Comfy dtype: INT
    - Python dtype: int
- crop_width
    - 定义CLIP编码裁剪区域的宽度，集中分析。
    - Comfy dtype: INT
    - Python dtype: int
- crop_height
    - 定义CLIP编码裁剪区域的高度，集中检查。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- CONDITIONING
    - 用于文本生成的输出条件数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- MODEL
    - 生成过程中使用的模型（如果有）。
    - Comfy dtype: MODEL
    - Python dtype: str
- CLIP
    - 用于增强提示的CLIP数据（如果有）。
    - Comfy dtype: CLIP
    - Python dtype: str
- TEXT_G
    - 主要生成的文本输出。
    - Comfy dtype: STRING
    - Python dtype: str
- TEXT_L
    - 次要生成的文本输出。
    - Comfy dtype: STRING
    - Python dtype: str


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
