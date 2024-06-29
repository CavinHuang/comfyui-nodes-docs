---
tags:
- IdentityImage
---

# Easy Apply InstantID (Advanced)
## Documentation
- Class name: `easy instantIDApplyADV`
- Category: `EasyUse/Adapter`
- Output node: `True`

The `easy instantIDApplyADV` node is designed for advanced application of InstantID technology, integrating various models and parameters to enhance image processing capabilities. It focuses on applying sophisticated identity verification and analysis techniques to images, leveraging InstantID and InsightFace models along with control network adjustments for optimized results.
## Input types
### Required
- **`pipe`**
    - Represents the pipeline configuration, serving as the foundational structure for the node's processing sequence.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `tuple`
- **`image`**
    - The image to be processed, acting as the primary input for identity verification and analysis.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Any`
- **`instantid_file`**
    - Specifies the file path for the InstantID model, enabling the node to load and apply the corresponding identity verification model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`insightface`**
    - Designates the InsightFace model to be used for facial analysis and recognition within the image processing workflow.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`control_net_name`**
    - Identifies the control network to be applied, influencing how the InstantID and InsightFace models are integrated and utilized.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cn_strength`**
    - Controls the strength of the control network's influence, adjusting the intensity of model application.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cn_soft_weights`**
    - Determines the soft weighting for the control network, fine-tuning the balance between different model influences.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight`**
    - Sets the overall weight of the InstantID application, impacting the prominence of identity verification features in the processed image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_at`**
    - Defines the starting point for model application within the processing sequence, allowing for phased integration of identity verification.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Specifies the endpoint for model application, concluding the identity verification and analysis phase.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise`**
    - Adjusts the level of noise introduced during the processing, affecting the clarity and authenticity of the identity verification.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`image_kps`**
    - Optional parameter for including key points of the image, enhancing the precision of facial analysis.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Any`
- **`mask`**
    - Optional parameter for applying a mask to the image, focusing the identity verification on specific areas.
    - Comfy dtype: `MASK`
    - Python dtype: `Any`
- **`control_net`**
    - Optional parameter for directly specifying the control network configuration, offering advanced customization.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `Any`
- **`positive`**
    - Optional conditioning parameter to emphasize certain features or attributes in the identity verification process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Any`
- **`negative`**
    - Optional conditioning parameter to de-emphasize or exclude certain features from the identity verification process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Any`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Returns the updated pipeline configuration, reflecting the applied identity verification and analysis.
    - Python dtype: `tuple`
- **`model`**
    - Comfy dtype: `MODEL`
    - Outputs the enhanced model, incorporating the applied InstantID and InsightFace technologies.
    - Python dtype: `Any`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - Outputs the conditioning parameters emphasizing desired features post-processing.
    - Python dtype: `Any`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Outputs the conditioning parameters de-emphasizing undesired features post-processing.
    - Python dtype: `Any`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class instantIDApplyAdvanced(instantID):

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
                    "positive": ("CONDITIONING",),
                    "negative": ("CONDITIONING",),
                },
                "hidden": {
                    "prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"
                },
        }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("pipe", "model", "positive", "negative")
    OUTPUT_NODE = True

    FUNCTION = "apply_advanced"
    CATEGORY = "EasyUse/Adapter"

    def apply_advanced(self, pipe, image, instantid_file, insightface, control_net_name, cn_strength, cn_soft_weights, weight, start_at, end_at, noise, image_kps=None, mask=None, control_net=None, positive=None, negative=None, prompt=None, extra_pnginfo=None, my_unique_id=None):

        positive = positive if positive is not None else pipe['positive']
        negative = negative if negative is not None else pipe['negative']

        return self.run(pipe, image, instantid_file, insightface, control_net_name, cn_strength, cn_soft_weights, weight, start_at, end_at, noise, image_kps, mask, control_net, positive, negative, prompt, extra_pnginfo, my_unique_id)

```
