
# Documentation
- Class name: SaltCLIPSegLoader
- Category: SALT/Loaders
- Output node: False

SaltCLIPSegLoader节点旨在加载和初始化用于图像分割任务的CLIPSeg模型。它简化了从指定源获取模型及其处理器的过程，并将它们本地缓存以提高重用效率。

# Input types
## Required
- model
    - 指定要加载的CLIPSeg模型的标识符。这为选择不同的CLIPSeg模型版本或配置提供了灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- clipseg_model
    - 返回一个包含CLIPSeg处理器和CLIPSeg模型的元组，可直接用于图像分割任务。
    - Comfy dtype: CLIPSEG_MODEL
    - Python dtype: Tuple[CLIPSegProcessor, CLIPSegForImageSegmentation]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltCLIPSegLoader:
    def __init__(self):
        pass
        
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": ("STRING", {"default": "CIDAS/clipseg-rd64-refined", "multiline": False}),
            },
        }

    RETURN_TYPES = ("CLIPSEG_MODEL",)
    RETURN_NAMES = ("clipseg_model",)
    FUNCTION = "clipseg_model"

    CATEGORY = f"{NAME}/Loaders"

    def clipseg_model(self, model):
        from transformers import CLIPSegProcessor, CLIPSegForImageSegmentation

        cache = os.path.join(models_dir, 'clipseg')

        inputs = CLIPSegProcessor.from_pretrained(model, cache_dir=cache)
        model = CLIPSegForImageSegmentation.from_pretrained(model, cache_dir=cache)

        return ( (inputs, model), ) 

```
