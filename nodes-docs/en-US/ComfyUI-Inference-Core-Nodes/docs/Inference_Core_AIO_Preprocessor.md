---
tags:
- DepthMap
- Image
- ImagePreprocessing
---

# [Inference.Core] AIO Aux Preprocessor
## Documentation
- Class name: `Inference_Core_AIO_Preprocessor`
- Category: `ControlNet Preprocessors`
- Output node: `False`

The Inference_Core_AIO_Preprocessor node is designed to streamline the preprocessing phase for a variety of input data types, specifically targeting the enhancement and preparation of data for subsequent processing or analysis within an AI-driven pipeline. It integrates auxiliary preprocessing functionalities and excludes certain preprocessing operations not suitable for image-to-image mapping, ensuring a versatile and optimized preprocessing workflow.
## Input types
### Required
- **`image`**
    - The 'image' parameter is the primary input for the node, representing the visual data that will undergo preprocessing. This input is essential for tailoring the preprocessing steps to the specific characteristics and requirements of the image, ensuring optimal preparation for further processing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`preprocessor`**
    - The 'preprocessor' parameter specifies the particular preprocessing technique to be applied to the input image. This selection allows for a customizable preprocessing workflow, adapting to various needs and enhancing the effectiveness of the data preparation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - The 'resolution' parameter defines the desired resolution for the output image after preprocessing. Adjusting this parameter allows for control over the output quality and size, catering to the specific requirements of subsequent processing stages.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The 'image' output represents the preprocessed image, now optimized and ready for further analysis or processing. This output is crucial for ensuring that the visual data is in the correct format and state for efficient and effective subsequent processing.
    - Python dtype: `torch.Tensor`
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
