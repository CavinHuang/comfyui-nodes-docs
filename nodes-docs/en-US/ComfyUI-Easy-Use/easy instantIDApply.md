---
tags:
- IdentityImage
---

# Easy Apply InstantID
## Documentation
- Class name: `easy instantIDApply`
- Category: `EasyUse/Adapter`
- Output node: `True`

This node facilitates the application of InstantID technology, integrating it with other models and processes within a pipeline to enhance identity verification and analysis capabilities. It leverages InstantID and InsightFace models, along with control network configurations, to process images for identity-related tasks.
## Input types
### Required
- **`pipe`**
    - Represents the pipeline configuration and state, serving as the foundation for applying InstantID technology.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
- **`image`**
    - The image to be processed, acting as the primary input for identity verification and analysis.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`instantid_file`**
    - Specifies the file path for the InstantID model, essential for loading and applying the model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`insightface`**
    - Indicates the InsightFace model to be used, enhancing the identity verification process with facial recognition capabilities.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`control_net_name`**
    - Specifies the control network name to be used in the process, affecting the application of InstantID.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cn_strength`**
    - Determines the strength of the control network's influence on the process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cn_soft_weights`**
    - Adjusts the soft weights for the control network, influencing its impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight`**
    - Sets the overall weight of the InstantID application in the pipeline.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_at`**
    - Defines the starting point of the InstantID application within the pipeline.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Specifies the endpoint of the InstantID application within the pipeline.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise`**
    - Controls the level of noise to be considered in the InstantID process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`image_kps`**
    - Optional keypoints in the image, used for more precise identity verification.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
- **`mask`**
    - Optional mask to be applied on the image, used for focusing or excluding specific areas.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[torch.Tensor]`
- **`control_net`**
    - Optional control network settings, providing additional control over the InstantID application.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `Optional[Dict[str, Any]]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The updated pipeline configuration after applying InstantID, reflecting changes in the processing state.
    - Python dtype: `Dict[str, Any]`
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model incorporating InstantID features, ready for further processing or analysis.
    - Python dtype: `Any`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - A positive outcome or feature extracted during the InstantID application, potentially used for further analysis.
    - Python dtype: `Any`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - A negative outcome or feature extracted during the InstantID application, potentially used for identifying discrepancies or errors.
    - Python dtype: `Any`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class instantIDApply(instantID):

    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
                "required":{
                     "pipe": ("PIPE_LINE",),
                     "image": ("IMAGE",),
                     "instantid_file": (folder_paths.get_filename_list("instantid"),),
                     "insightface": (["CPU", "CUDA", "ROCM"],),
                     "control_net_name": (folder_paths.get_filename_list("controlnet"),),
                     "cn_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                     "cn_soft_weights": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001},),
                     "weight": ("FLOAT", {"default": .8, "min": 0.0, "max": 5.0, "step": 0.01, }),
                     "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001, }),
                     "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001, }),
                     "noise": ("FLOAT", {"default": 0.35, "min": 0.0, "max": 1.0, "step": 0.05, }),
                },
                "optional": {
                    "image_kps": ("IMAGE",),
                    "mask": ("MASK",),
                    "control_net": ("CONTROL_NET",),
                },
                "hidden": {
                    "prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"
                },
        }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("pipe", "model", "positive", "negative")
    OUTPUT_NODE = True

    FUNCTION = "apply"
    CATEGORY = "EasyUse/Adapter"


    def apply(self, pipe, image, instantid_file, insightface, control_net_name, cn_strength, cn_soft_weights, weight, start_at, end_at, noise, image_kps=None, mask=None, control_net=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        positive = pipe['positive']
        negative = pipe['negative']
        return self.run(pipe, image, instantid_file, insightface, control_net_name, cn_strength, cn_soft_weights, weight, start_at, end_at, noise, image_kps, mask, control_net, positive, negative, prompt, extra_pnginfo, my_unique_id)

```
