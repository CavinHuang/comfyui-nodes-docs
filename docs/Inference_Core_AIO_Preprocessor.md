
# Documentation
- Class name: Inference_Core_AIO_Preprocessor
- Category: ControlNet Preprocessors
- Output node: False

Inference_Core_AIO_Preprocessor节点旨在简化各种输入数据类型的预处理阶段，特别针对AI驱动管道中后续处理或分析的数据增强和准备。它集成了辅助预处理功能，并排除了不适用于图像到图像映射的某些预处理操作，确保了一个多功能且优化的预处理工作流程。

# Input types
## Required
- image
    - image参数是该节点的主要输入，代表将要进行预处理的视觉数据。这个输入对于根据图像的特定特征和要求定制预处理步骤至关重要，确保为进一步处理做好最佳准备。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- preprocessor
    - preprocessor参数指定了要应用于输入图像的特定预处理技术。这种选择允许定制预处理工作流程，适应各种需求并提高数据准备的有效性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - resolution参数定义了预处理后输出图像的所需分辨率。调整此参数可以控制输出质量和大小，以满足后续处理阶段的特定要求。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - image输出代表经过预处理的图像，现在已经优化并准备好进行进一步分析或处理。这个输出对于确保视觉数据处于正确的格式和状态，以便进行高效和有效的后续处理至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AIO_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        auxs = list(AUX_NODE_MAPPINGS.keys())
        auxs.insert(0, "none")
        for name in AIO_NOT_SUPPORTED:
            if name in auxs: auxs.remove(name)
        
        return create_node_input_types(
            preprocessor=(auxs, {"default": "none"})
        )

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
