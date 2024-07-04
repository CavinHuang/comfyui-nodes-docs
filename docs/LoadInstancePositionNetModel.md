
# Documentation
- Class name: LoadInstancePositionNetModel
- Category: instance/loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LoadInstancePositionNetModel节点用于加载PositionNet模型，这是实例扩散框架的一个重要组成部分。该节点通过读取指定的模型文件并应用必要的配置来实现PositionNet的加载。它使用预定义的参数初始化PositionNet，并提供了包含分割信息的选项，从而为后续的基于实例的处理任务做好准备。

# Input types
## Required
- model_filename
    - 指定要加载的PositionNet模型文件名。这个参数对于从预定义目录中识别和检索正确的模型文件至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- use_segs
    - 决定是否在PositionNet模型配置中使用分割信息。这个布尔标志允许根据分割数据的存在与否灵活地调整模型。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- positionnet
    - 加载完成的PositionNet模型，可用于基于实例的处理任务。这个输出封装了使用指定配置初始化的模型。
    - Comfy dtype: POSITIONNET
    - Python dtype: torch.nn.Module
- fusers
    - 加载完成的fusers模型，它是实例扩散框架的一部分，准备与其他组件集成。
    - Comfy dtype: FUSERS
    - Python dtype: torch.nn.Module
- scaleu
    - 加载完成的ScaleU模型，实例扩散框架的另一个组件，为实例的缩放和处理做好准备。
    - Comfy dtype: SCALEU
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoadInstancePositionNetNode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model_filename": (get_model_list(constants.INSTANCE_POSITIONNET_DIR),),
            "use_segs": ("BOOLEAN", {"default": True}),
        }}

    RETURN_TYPES = ("POSITIONNET", "FUSERS", "SCALEU",)
    FUNCTION = "load_model"

    CATEGORY = "instance/loaders"

    def load_model(self, model_filename: str, use_segs: bool):
        checkpoint = load_checkpoint(
            constants.INSTANCE_POSITIONNET_DIR, model_filename)
        params = get_positionnet_default_params()
        params["use_segs"] = use_segs
        model = prepare_positionnet(checkpoint, params)
        positionnet = {
            'model': model,
        }
        return (positionnet,)

```
