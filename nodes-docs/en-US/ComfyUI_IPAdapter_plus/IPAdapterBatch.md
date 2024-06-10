---
tags:
- IPAdapter
---

# IPAdapter Batch (Adv.)
## Documentation
- Class name: `IPAdapterBatch`
- Category: `ipadapter`
- Output node: `False`

The IPAdapterBatch node is designed for batch processing of images with advanced IPAdapter configurations, enabling the application of image processing techniques and model adjustments across multiple images simultaneously. It extends the capabilities of IPAdapterAdvanced by allowing for batch operations, thus optimizing workflow efficiency and processing speed.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for image processing, central to the node's operation and determining the processing capabilities.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`ipadapter`**
    - Defines the IPAdapter configuration to be applied, crucial for determining the specific image processing techniques and adjustments.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `str`
- **`image`**
    - The image(s) to be processed, can be a single image or a batch of images, serving as the primary input for processing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `list or str`
- **`weight`**
    - A float value or a range of values specifying the weight of the processing effect, influencing the intensity of the applied adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float or list[float]`
- **`weight_type`**
    - Determines the type of weighting applied to the processing, affecting how the adjustments are balanced and applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_at`**
    - A float specifying the starting point of processing within a given range, allowing for fine-tuned control over the application of adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - A float defining the end point of processing within a given range, enabling precise control over the extent of adjustments applied.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`embeds_scaling`**
    - Specifies the method of embedding scaling, affecting the adaptation of embeddings to the image processing task.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
### Optional
- **`image_negative`**
    - An optional image input that serves as a negative reference, guiding the processing in a direction opposite to the provided image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`attn_mask`**
    - An optional mask that directs attention to specific areas of the image during processing, enhancing focus on relevant features.
    - Comfy dtype: `MASK`
    - Python dtype: `str`
- **`clip_vision`**
    - An optional CLIP vision model input that can be used to guide the image processing with visual concepts derived from text descriptions.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The processed model after applying the IPAdapter configurations and adjustments to the input images.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterBatch(IPAdapterAdvanced):
    def __init__(self):
        self.unfold_batch = True

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL", ),
                "ipadapter": ("IPADAPTER", ),
                "image": ("IMAGE",),
                "weight": ("FLOAT", { "default": 1.0, "min": -1, "max": 5, "step": 0.05 }),
                "weight_type": (WEIGHT_TYPES, ),
                "start_at": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "end_at": ("FLOAT", { "default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "embeds_scaling": (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'], ),
            },
            "optional": {
                "image_negative": ("IMAGE",),
                "attn_mask": ("MASK",),
                "clip_vision": ("CLIP_VISION",),
            }
        }

```
