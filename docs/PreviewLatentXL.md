
# Documentation
- Class name: PreviewLatentXL
- Category: latent
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PreviewLatentXL节点专门用于使用SDXL基础模型生成潜在表示的预览。它通过自动确定最佳预览方法并结合额外信息（如提示和唯一标识符），增强了潜在空间的可视化效果。

# Input types
## Required
- latent
    - 需要可视化的潜在表示。这是生成预览的核心输入。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Output types
- latent
    - 修改后的潜在表示，可能在预览生成过程中进行了调整。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PreviewLatentXL(PreviewLatentAdvanced):
    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                    {"latent": ("LATENT",),
                     },
                "hidden": {"prompt": "PROMPT",
                           "extra_pnginfo": "EXTRA_PNGINFO",
                           "my_unique_id": "UNIQUE_ID",},
                }

    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("latent",)
    OUTPUT_NODE = True
    FUNCTION = "lpreview_xl"
    CATEGORY = "latent"

    def lpreview_xl(self, latent, prompt=None, extra_pnginfo=None, my_unique_id=None):
        return PreviewLatentAdvanced().lpreview(latent=latent, base_model="SDXL", preview_method="auto", prompt=prompt, extra_pnginfo=extra_pnginfo, my_unique_id=my_unique_id)

```
