
# Documentation
- Class name: LoadInstanceFusersNode
- Category: instance/loaders
- Output node: False

此节点旨在从指定目录加载和准备实例融合器模型，并根据提供的参数调整其比例。它促进了融合器模型在实例扩散过程中的动态整合，从而实现对实例特定特征融合的增强控制。

# Input types
## Required
- model_filename
    - 指定要加载的模型文件名。这个参数对于从指定目录中识别和检索正确的融合器模型至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- fusers_scale
    - 确定要应用于融合器的缩放因子，影响它们在实例融合过程中的作用。这允许对融合器对生成实例的影响进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- fusers
    - 提供已加载和缩放的融合器模型列表，可以直接集成到实例扩散过程中。
    - Comfy dtype: FUSERS
    - Python dtype: Dict[str, List[torch.nn.Module]]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoadInstanceFusersNode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model_filename": (get_model_list(constants.INSTANCE_FUSERS_DIR),),
            "fusers_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
        }}

    RETURN_TYPES = ("FUSERS",)
    FUNCTION = "load_model"

    CATEGORY = "instance/loaders"

    def load_model(self, model_filename: str, fusers_scale: float):
        checkpoint = load_checkpoint(
            constants.INSTANCE_FUSERS_DIR, model_filename)
        fusers_list = prepare_fusers(checkpoint, fusers_scale)
        fusers = {
            'model_list': fusers_list
        }
        return (fusers,)

```
