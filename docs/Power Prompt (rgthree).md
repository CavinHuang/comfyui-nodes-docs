
# Documentation
- Class name: Power Prompt (rgthree)
- Category: rgthree
- Output node: False

Power Prompt节点旨在处理文本提示，在进一步处理之前可能会通过添加额外上下文或修改来增强它们。它利用处理特定文本模式的实用工具，并与其他文本编码组件集成，旨在为更复杂的文本到图像或文本到文本应用准备输入。

# Input types
## Required
- prompt
    - 节点处理的主要文本输入。根据节点的逻辑和提供的额外参数，它可能会经历各种转换或增强。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- opt_model
    - 一个可选参数，允许选择特定模型来处理提示，可能会根据模型的特性影响结果。
    - Comfy dtype: MODEL
    - Python dtype: Optional[str]
- opt_clip
    - 一个可选参数，如果提供，允许使用CLIP模型将提示与此参数的值一起编码。这可用于生成用于进一步处理的条件向量。
    - Comfy dtype: CLIP
    - Python dtype: Optional[str]
- insert_lora
    - 允许在提示中包含LORA（局部优化感受野注意力）调整，这可以根据所选LORA的属性修改处理行为。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Optional[str]
- insert_embedding
    - 允许将预定义的嵌入插入到提示中，增强其上下文或特异性以进行后续处理。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Optional[str]
- insert_saved
    - 允许从预定义列表中包含已保存的提示，可能为主要提示添加更多深度或上下文。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Optional[str]

# Output types
- CONDITIONING
    - 使用CLIP模型从提示和可选的'opt_clip'参数生成的条件向量。此向量可用于文本到图像或其他生成任务的进一步处理。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[torch.Tensor]
- MODEL
    - 选择用于处理提示的模型（如果有），可能会影响最终输出。
    - Comfy dtype: MODEL
    - Python dtype: Optional[str]
- CLIP
    - 用于编码提示的CLIP模型（如果指定），可能会影响生成的条件向量。
    - Comfy dtype: CLIP
    - Python dtype: Optional[str]
- TEXT
    - 经过处理或增强的提示，准备进行进一步应用或处理。
    - Comfy dtype: STRING
    - Python dtype: str


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
