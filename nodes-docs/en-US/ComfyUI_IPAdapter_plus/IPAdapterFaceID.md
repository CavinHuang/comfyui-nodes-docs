---
tags:
- IPAdapter
---

# IPAdapter FaceID
## Documentation
- Class name: `IPAdapterFaceID`
- Category: `ipadapter/faceid`
- Output node: `False`

The IPAdapterFaceID node is designed to enhance image processing capabilities by integrating face identification features. It leverages advanced IPAdapter functionalities to apply face-specific adjustments and embeddings, aiming to improve the quality and relevance of generated images based on facial recognition.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for face identification, central to the node's operation.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`ipadapter`**
    - Defines the IPAdapter configuration to be used, crucial for determining how face identification features are integrated.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `str`
- **`image`**
    - The input image to be processed, serving as the basis for face identification and subsequent adjustments.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`weight`**
    - A float value that adjusts the influence of the face identification features on the final image output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_faceidv2`**
    - A float value specifically for adjusting the influence of FaceID v2 features, offering finer control over the face identification process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Determines the method of weighting face identification features, affecting how these features influence the final image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`combine_embeds`**
    - Specifies the method for combining face identification embeddings, impacting the integration of facial features into the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`start_at`**
    - A float value indicating the starting point for applying face identification features within the processing pipeline.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - A float value indicating the end point for applying face identification features, defining the scope of their influence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`embeds_scaling`**
    - Describes how face identification embeddings are scaled, affecting their impact on the image processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
### Optional
- **`image_negative`**
    - An optional input image to be used in a negative context, providing additional control over the face identification process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`attn_mask`**
    - An optional mask to focus or limit the attention mechanism during face identification, enhancing processing accuracy.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`clip_vision`**
    - An optional CLIP vision model to further refine the face identification process through visual context.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `torch.Tensor`
- **`insightface`**
    - An optional InsightFace model required for certain face identification functionalities, enhancing the node's capabilities.
    - Comfy dtype: `INSIGHTFACE`
    - Python dtype: `torch.Tensor`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The processed model with integrated face identification features, ready for further image generation tasks.
    - Python dtype: `str`
- **`face_image`**
    - Comfy dtype: `IMAGE`
    - The output image that has been enhanced with face identification features, showcasing improved facial recognition and integration.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterFaceID(IPAdapterAdvanced):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL", ),
                "ipadapter": ("IPADAPTER", ),
                "image": ("IMAGE",),
                "weight": ("FLOAT", { "default": 1.0, "min": -1, "max": 3, "step": 0.05 }),
                "weight_faceidv2": ("FLOAT", { "default": 1.0, "min": -1, "max": 5.0, "step": 0.05 }),
                "weight_type": (WEIGHT_TYPES, ),
                "combine_embeds": (["concat", "add", "subtract", "average", "norm average"],),
                "start_at": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "end_at": ("FLOAT", { "default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "embeds_scaling": (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'], ),
            },
            "optional": {
                "image_negative": ("IMAGE",),
                "attn_mask": ("MASK",),
                "clip_vision": ("CLIP_VISION",),
                "insightface": ("INSIGHTFACE",),
            }
        }

    CATEGORY = "ipadapter/faceid"
    RETURN_TYPES = ("MODEL","IMAGE",)
    RETURN_NAMES = ("MODEL", "face_image", )

```
