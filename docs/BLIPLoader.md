
# Documentation
- Class name: BLIPLoader
- Category: Art Venture/Captioning
- Output node: False

BLIPLoader 节点旨在加载并初始化 BLIP 模型，以执行图像处理任务。它封装了设置 BLIP 模型的复杂过程，包括加载预训练权重、配置模型以进行推理，并确保模型准备就绪以处理图像。

# Input types
## Required
- model_name
    - 指定要加载的 BLIP 模型的名称。此参数决定了加载哪个预训练模型权重，从而影响节点的性能和图像处理的质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- blip_model
    - 返回一个完全配置好、准备就绪的 BLIP 模型实例，可用于执行各种图像理解和操作任务。
    - Comfy dtype: BLIP_MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [BLIPCaption](../../comfyui-art-venture/Nodes/BLIPCaption.md)



## Source code
```python
class BlipLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model_name": (folder_paths.get_filename_list("blip"),),
            },
        }

    RETURN_TYPES = ("BLIP_MODEL",)
    FUNCTION = "load_blip"
    CATEGORY = "Art Venture/Captioning"

    def load_blip(self, model_name):
        model = load_blip(model_name)
        return (model,)

```
