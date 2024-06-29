---
tags:
- IdentityImage
---

# Apply InstantID Advanced
## Documentation
- Class name: `ApplyInstantIDAdvanced`
- Category: `InstantID`
- Output node: `False`

The ApplyInstantIDAdvanced node is designed to enhance image generation with specific identity features by applying advanced conditioning techniques. It utilizes a combination of InstantID, insight face analysis, control net adjustments, and additional parameters to fine-tune the identity preservation and control in the generated images.
## Input types
### Required
- **`instantid`**
    - The InstantID parameter is crucial for providing the identity-specific features to be preserved or emphasized in the generated image.
    - Comfy dtype: `INSTANTID`
    - Python dtype: `dict`
- **`insightface`**
    - Insightface parameter is used for face analysis, providing critical facial feature information that aids in the identity preservation process.
    - Comfy dtype: `FACEANALYSIS`
    - Python dtype: `dict`
- **`control_net`**
    - Control net parameter allows for fine-tuning and control over the generation process, ensuring the identity features are accurately applied.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `dict`
- **`image`**
    - The image parameter serves as the base for identity application, where the identity features are to be preserved or emphasized.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`model`**
    - Model parameter specifies the generative model to be used in conjunction with identity features for image generation.
    - Comfy dtype: `MODEL`
    - Python dtype: `dict`
- **`positive`**
    - Positive conditioning to emphasize certain identity features in the generated image.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Negative conditioning to de-emphasize certain identity features in the generated image.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`ip_weight`**
    - IP weight parameter adjusts the influence of identity preservation in the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cn_strength`**
    - CN strength parameter controls the strength of the control net adjustments in the identity application process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_at`**
    - Start at parameter defines the beginning point of identity feature application in the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - End at parameter defines the end point of identity feature application in the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise`**
    - Noise parameter introduces variability in the identity features application, enhancing the naturalness of the generated image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`combine_embeds`**
    - Combine embeds parameter determines the method of combining multiple identity embeddings for application in the image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`image_kps`**
    - Image keypoints parameter provides additional facial feature information for enhanced identity preservation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Mask parameter allows for selective application of identity features in the generated image, enhancing control over the preservation process.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The output model after applying InstantIDAdvanced, incorporating the identity features and adjustments made through the input parameters.
    - Python dtype: `dict`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The enhanced positive conditioning output, reflecting the emphasized identity features in the generated image.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The enhanced negative conditioning output, reflecting the de-emphasized identity features in the generated image.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ApplyInstantIDAdvanced(ApplyInstantID):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "instantid": ("INSTANTID", ),
                "insightface": ("FACEANALYSIS", ),
                "control_net": ("CONTROL_NET", ),
                "image": ("IMAGE", ),
                "model": ("MODEL", ),
                "positive": ("CONDITIONING", ),
                "negative": ("CONDITIONING", ),
                "ip_weight": ("FLOAT", {"default": .8, "min": 0.0, "max": 3.0, "step": 0.01, }),
                "cn_strength": ("FLOAT", {"default": .8, "min": 0.0, "max": 10.0, "step": 0.01, }),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001, }),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001, }),
                "noise": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.1, }),
                "combine_embeds": (['average', 'norm average', 'concat'], {"default": 'average'}),
            },
            "optional": {
                "image_kps": ("IMAGE",),
                "mask": ("MASK",),
            }
        }

```
