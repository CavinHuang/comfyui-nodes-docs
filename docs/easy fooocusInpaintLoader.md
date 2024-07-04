
# Documentation
- Class name: easy fooocusInpaintLoader
- Category: EasyUse/Inpaint
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

easy fooocusInpaintLoader节点旨在简化ComfyUI框架中修复模型和补丁的加载与应用过程。它主要专注于将修复功能整合到模型处理流程中，通过应用学习到的修复模式来增强或修正图像。

# Input types
## Required
- head
    - head参数代表要加载的修复模型头部。它在决定修复行为和输出图像质量方面起着至关重要的作用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- patch
    - patch参数指的是要应用的特定修复补丁。这个补丁会修改模型的行为，允许基于提供的补丁信息进行有针对性的修复。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- patch
    - 输出是一个包含修复头部模型和LoRA补丁的元组，可以直接应用于模型以执行修复任务。
    - Comfy dtype: INPAINT_PATCH
    - Python dtype: Tuple[torch.nn.Module, dict]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class fooocusInpaintLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "head": (list(FOOOCUS_INPAINT_HEAD.keys()),),
                "patch": (list(FOOOCUS_INPAINT_PATCH.keys()),),
            }
        }

    RETURN_TYPES = ("INPAINT_PATCH",)
    RETURN_NAMES = ("patch",)
    CATEGORY = "EasyUse/Inpaint"
    FUNCTION = "apply"

    def apply(self, head, patch):
        global inpaint_head_model

        head_file = get_local_filepath(FOOOCUS_INPAINT_HEAD[head]["model_url"], INPAINT_DIR)
        if inpaint_head_model is None:
            inpaint_head_model = InpaintHead()
            sd = torch.load(head_file, map_location='cpu')
            inpaint_head_model.load_state_dict(sd)

        patch_file = get_local_filepath(FOOOCUS_INPAINT_PATCH[patch]["model_url"], INPAINT_DIR)
        inpaint_lora = comfy.utils.load_torch_file(patch_file, safe_load=True)

        return ((inpaint_head_model, inpaint_lora),)

```
