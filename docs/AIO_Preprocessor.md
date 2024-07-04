
# Documentation
- Class name: AIO_Preprocessor
- Category: ControlNet Preprocessors
- Output node: False

AIO_Preprocessor节点旨在根据选定的预处理器类型，动态选择并对图像应用特定的辅助预处理操作。它支持多种预处理选项，能够自动配置并执行适当的辅助预处理器，以根据所选预处理器的要求修改图像。

# Input types
## Required
- image
    - 待预处理的输入图像。此图像将直接传递给所选的辅助预处理器进行修改。
    - Comfy dtype: IMAGE
    - Python dtype: Image

## Optional
- preprocessor
    - 指定要应用于图像的预处理类型。此选择决定了将执行哪个辅助预处理器的逻辑，从而影响图像的最终预处理结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 预处理操作的分辨率，某些预处理器可能会使用它来调整处理细节级别或输出分辨率。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 经选定辅助预处理器修改后的预处理图像。
    - Comfy dtype: IMAGE
    - Python dtype: Image


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ControlNetApply](../../Comfy/Nodes/ControlNetApply.md)
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)



## Source code
```python
class AIO_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(preprocessor=(PREPROCESSOR_OPTIONS, {"default": "none"}))

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors"

    def execute(self, preprocessor, image, resolution=512):
        if preprocessor == "none":
            return (image, )
        else:
            aux_class = AUX_NODE_MAPPINGS[preprocessor]
            input_types = aux_class.INPUT_TYPES()
            input_types = {
                **input_types["required"],
                **(input_types["optional"] if "optional" in input_types else {})
            }
            params = {}
            for name, input_type in input_types.items():
                if name == "image":
                    params[name] = image
                    continue

                if name == "resolution":
                    params[name] = resolution
                    continue

                if len(input_type) == 2 and ("default" in input_type[1]):
                    params[name] = input_type[1]["default"]
                    continue

                default_values = { "INT": 0, "FLOAT": 0.0 }
                if input_type[0] in default_values:
                    params[name] = default_values[input_type[0]]

            return getattr(aux_class(), aux_class.FUNCTION)(**params)

```
