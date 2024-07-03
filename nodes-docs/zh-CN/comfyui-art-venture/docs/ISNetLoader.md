
# Documentation
- Class name: ISNetLoader
- Category: Art Venture/Segmentation
- Output node: False
- Repo Ref: https://github.com/ArtVentureX/comfyui-art-venture

ISNetLoader节点用于加载ISNet模型，允许通过名称选择特定模型或使用指定的替代模型进行覆盖。这一功能支持在Art Venture/Segmentation类别中动态加载图像分割任务的模型，提高了模型管理和部署的灵活性。

# Input types
## Required
- model_name
    - 指定要加载的ISNet模型的名称。此参数允许从预定义的可用ISNet模型列表中选择模型，便于根据特定需求进行有针对性的模型加载。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- model_override
    - 允许指定要加载的替代ISNet模型，覆盖默认的模型选择。此参数提供了模型使用的灵活性，无需更改核心配置即可适应模型偏好的变更或更新。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- isnet_model
    - 返回加载的ISNet模型，可直接用于图像分割任务。此输出便于将模型直接应用于相关的图像处理工作流程中。
    - Comfy dtype: ISNET_MODEL
    - Python dtype: ISNetBase or ISNetDIS


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ISNetLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model_name": (folder_paths.get_filename_list("isnet"),),
                "model_override": ("STRING", {"default": "None"}),
            },
        }

    RETURN_TYPES = ("ISNET_MODEL",)
    FUNCTION = "load_isnet"
    CATEGORY = "Art Venture/Segmentation"

    def load_isnet(self, model_name, model_override="None"):
        if model_override != "None":
            if model_override not in folder_paths.get_filename_list("isnet"):
                logger.warning(f"Model override {model_override} not found. Use {model_name} instead.")
            else:
                model_name = model_override

        model = load_isnet_model(model_name)
        return (model,)

```
