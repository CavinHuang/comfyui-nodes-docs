
# Documentation
- Class name: Power Prompt - Simple (rgthree)
- Category: rgthree
- Output node: False

"Power Prompt - Simple (rgthree)"节点旨在简化根据给定提示生成条件和文本输出的过程。它可以选择性地整合CLIP嵌入，并允许插入预先保存的提示或嵌入，从而简化了定制文本输入的创建流程，以便进行后续处理。

# Input types
## Required
- prompt
    - 用于生成条件和文本输出的主要文本输入。它作为进一步修改或增强的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- opt_clip
    - 可选的CLIP模型输入，如果提供，将用于基于提示生成条件输出，从而提高生成文本的相关性或特异性。
    - Comfy dtype: CLIP
    - Python dtype: Optional[str]
- insert_embedding
    - 允许通过名称插入预先保存的嵌入，使得可以用特定的、预定义的特征来定制提示。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Optional[str]
- insert_saved
    - 允许通过文件名包含预先保存的提示，便于在新的生成中重复使用先前制作的提示。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Optional[str]

# Output types
- CONDITIONING
    - 基于提示生成的条件输出，可选择通过CLIP模型增强，可用于进一步处理或优化。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[torch.Tensor]
- TEXT
    - 原始或修改后的提示文本，可用作后续操作或模型的输入。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreePowerPromptSimple(RgthreePowerPrompt):

    NAME=get_name('Power Prompt - Simple')
    CATEGORY = get_category()

    @classmethod
    def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
        SAVED_PROMPTS_FILES=folder_paths.get_filename_list('saved_prompts')
        SAVED_PROMPTS_CONTENT=[]
        for filename in SAVED_PROMPTS_FILES:
            with open(folder_paths.get_full_path('saved_prompts', filename), 'r') as f:
                SAVED_PROMPTS_CONTENT.append(f.read())
        return {
            'required': {
                'prompt': ('STRING', {'multiline': True}),
            },
            'optional': {
                "opt_clip": ("CLIP", ),
                'insert_embedding': (['CHOOSE',] + [os.path.splitext(x)[0] for x in folder_paths.get_filename_list('embeddings')],),
                'insert_saved': (['CHOOSE',] + SAVED_PROMPTS_FILES,),
            },
            'hidden': {
                'values_insert_saved': (['CHOOSE'] + SAVED_PROMPTS_CONTENT,),
            }
        }

    RETURN_TYPES = ('CONDITIONING', 'STRING',)
    RETURN_NAMES = ('CONDITIONING', 'TEXT',)
    FUNCTION = 'main'

    def main(self, prompt, opt_clip=None, insert_embedding=None, insert_saved=None, values_insert_saved=None):
        conditioning=None
        if opt_clip != None:
            conditioning = CLIPTextEncode().encode(opt_clip, prompt)[0]

        return (conditioning, prompt)

```
