
# Documentation
- Class name: PreviewLatent
- Category: latent
- Output node: True

PreviewLatent节点提供了一种机制来生成潜在表示的可视化预览。它利用基本模型和可选参数来生成图像，这些图像直观地展示了潜在空间中编码的信息。

# Input types
## Required
- latent
    - 需要被可视化的潜在表示。这是生成预览图像的核心输入。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- latent
    - 返回相同的潜在输入，允许进行潜在的进一步处理或分析。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PreviewLatent(PreviewLatentAdvanced):
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
    FUNCTION = "lpreview_basic"
    CATEGORY = "latent"

    def lpreview_basic(self, latent, prompt=None, extra_pnginfo=None, my_unique_id=None):
        return PreviewLatentAdvanced().lpreview(latent=latent, base_model="SD15", preview_method="auto", prompt=prompt, extra_pnginfo=extra_pnginfo, my_unique_id=my_unique_id)

```
