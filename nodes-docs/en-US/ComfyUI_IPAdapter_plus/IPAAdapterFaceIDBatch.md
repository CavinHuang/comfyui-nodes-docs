---
tags:
- IPAdapter
---

# IPAdapter FaceID Batch
## Documentation
- Class name: `IPAAdapterFaceIDBatch`
- Category: `ipadapter/faceid`
- Output node: `False`

IPAAdapterFaceIDBatch extends the capabilities of IPAdapterFaceID by introducing batch processing functionality, allowing for the efficient handling of multiple inputs simultaneously. This node is designed to enhance the adaptability and performance of image processing tasks, particularly those involving facial identification and manipulation, by leveraging batch operations.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for processing, serving as a core component of the node's operation.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`ipadapter`**
    - Defines the IPAdapter to be utilized, indicating the specific adapter configuration for image processing.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `str`
- **`image`**
    - Represents the image input for processing, central to the node's functionality in handling visual data.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`weight`**
    - Determines the weighting factor for the processing, influencing the outcome based on the specified value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_faceidv2`**
    - Specifies the weighting factor for FaceID v2 processing, adjusting the influence of this specific feature on the overall processing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Indicates the type of weighting to be applied, affecting how weights are interpreted and utilized in processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`combine_embeds`**
    - Defines the method for combining embeddings, which plays a crucial role in the integration and manipulation of image features.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_at`**
    - Sets the starting point for processing, allowing for fine-tuned control over the operation's initiation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Determines the ending point for processing, providing a mechanism to precisely define the scope of the operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`embeds_scaling`**
    - Specifies the scaling approach for embeddings, impacting how image features are adjusted and integrated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`image_negative`**
    - Optional. Represents a negative image input, used for contrast or as a counterpoint in processing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`attn_mask`**
    - Optional. Defines an attention mask, enhancing the focus and specificity of processing on certain image areas.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`clip_vision`**
    - Optional. Specifies the use of CLIP vision features, enriching the processing with advanced visual understanding capabilities.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `str`
- **`insightface`**
    - Optional. Indicates the use of the InsightFace model, crucial for advanced facial identification tasks.
    - Comfy dtype: `INSIGHTFACE`
    - Python dtype: `str`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - Returns the processed model, reflecting the modifications and enhancements made during the operation.
    - Python dtype: `str`
- **`face_image`**
    - Comfy dtype: `IMAGE`
    - Outputs the processed face image, showcasing the results of the facial identification and manipulation tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class IPAAdapterFaceIDBatch(IPAdapterFaceID):
    def __init__(self):
        self.unfold_batch = True

```
