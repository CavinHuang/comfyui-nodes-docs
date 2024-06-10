---
tags:
- Mask
- MaskGeneration
---

# ReActor 🌌 Masking Helper
## Documentation
- Class name: `ReActorMaskHelper`
- Category: `🌌 ReActor`
- Output node: `False`

The ReActorMaskHelper node is designed to assist in the process of masking within the ReActor framework. It likely involves operations such as combining, dilating, and possibly refining masks to be used in face swapping or restoration tasks, leveraging specific detection hints and mask manipulation techniques to optimize the masking process for better results.
## Input types
### Required
- **`image`**
    - The 'image' parameter is the primary input for mask-related operations, serving as the base for detection, manipulation, and transformation processes.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`swapped_image`**
    - This parameter represents the image resulting from a face swap operation, which may require further masking or adjustments.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`bbox_model_name`**
    - Specifies the name of the model used for bounding box detection, influencing the initial step of mask generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`bbox_threshold`**
    - The threshold value for bounding box detection, determining the sensitivity of the model in identifying potential areas of interest.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_dilation`**
    - Indicates the dilation factor applied to bounding boxes, potentially expanding the area considered for mask application.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bbox_crop_factor`**
    - Defines how much to crop around the detected bounding box, affecting the final mask's coverage area.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_drop_size`**
    - The minimum size for bounding boxes to be considered, filtering out detections that are too small.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sam_model_name`**
    - The name of the model used for SAM (Semantic Attention Mask) prediction, crucial for refining mask details.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sam_dilation`**
    - Dilation factor specifically for SAM predictions, adjusting the mask's boundary for better fit or coverage.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sam_threshold`**
    - Threshold for SAM predictions, determining which masks are included based on confidence scores.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_expansion`**
    - Specifies how much to expand the bounding box beyond its detected borders, affecting the area covered by the mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mask_hint_threshold`**
    - Threshold for generating mask hints, used in processes that require pre-identification of mask areas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mask_hint_use_negative`**
    - Indicates whether to use negative hints (areas not to mask) in the mask generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`morphology_operation`**
    - Specifies the type of morphological operation (e.g., dilate, erode) to apply to the mask, affecting its shape and boundaries.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`morphology_distance`**
    - The distance parameter for the morphological operation, determining the extent of the transformation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blur_radius`**
    - Radius for blurring the mask, used to soften edges or blend the mask more seamlessly with the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma_factor`**
    - Factor for calculating the sigma value in Gaussian blur, affecting the smoothness of the mask's edges.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`mask_optional`**
    - An optional mask input that can be used for additional mask operations or adjustments.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The processed image with applied mask modifications, ready for further use or display.
    - Python dtype: `torch.Tensor`
- **`MASK`**
    - Comfy dtype: `MASK`
    - The final mask generated or modified by the node, suitable for masking or compositing operations.
    - Python dtype: `torch.Tensor`
- **`MASK_PREVIEW`**
    - Comfy dtype: `IMAGE`
    - A preview of the mask, typically used for visualization or debugging purposes.
    - Python dtype: `torch.Tensor`
- **`SWAPPED_FACE`**
    - Comfy dtype: `IMAGE`
    - The image resulting from a face swap operation, potentially including mask adjustments for improved integration.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
