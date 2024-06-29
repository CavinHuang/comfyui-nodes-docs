---
tags:
- ImpactPack
- Segmentation
---

# Set Default Image for SEGS
## Documentation
- Class name: `SetDefaultImageForSEGS`
- Category: `ImpactPack/Util`
- Output node: `False`

The SetDefaultImageForSEGS node is designed to integrate a default image into the SEGS (Segmentation Elements) data structure. This operation is crucial for scenarios where specific segments within SEGS lack associated images, ensuring that all segments have a visual representation, either original or default, to maintain consistency and facilitate further processing or visualization.
## Input types
### Required
- **`segs`**
    - The 'segs' parameter represents the SEGS (Segmentation Elements) data structure that is to be processed. It is essential for specifying the segments that may require the integration of a default image, based on their current image association status.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[torch.Tensor, List[SEG]]`
- **`image`**
    - The 'image' parameter serves as the default image to be integrated into segments within SEGS that lack an associated image. This ensures that all segments have a visual representation, enhancing consistency across the data structure.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`override`**
    - The 'override' parameter determines whether the default image should replace existing images for all segments within SEGS, ensuring uniformity or preserving original images where they exist.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - This output consists of the SEGS data structure after the integration of the default image into segments lacking an associated image, ensuring that each segment has a visual representation.
    - Python dtype: `Tuple[torch.Tensor, List[SEG]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DefaultImageForSEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "segs": ("SEGS", ),
                    "image": ("IMAGE", ),
                    "override": ("BOOLEAN", {"default": True}),
                }}

    RETURN_TYPES = ("SEGS", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs, image, override):
        results = []

        segs = core.segs_scale_match(segs, image.shape)

        if len(segs[1]) > 0:
            if segs[1][0].cropped_image is not None:
                batch_count = len(segs[1][0].cropped_image)
            else:
                batch_count = len(image)

            for seg in segs[1]:
                if seg.cropped_image is not None and not override:
                    cropped_image = seg.cropped_image
                else:
                    cropped_image = None
                    for i in range(0, batch_count):
                        # take from original image
                        ref_image = image[i].unsqueeze(0)
                        cropped_image2 = crop_image(ref_image, seg.crop_region)

                        if cropped_image is None:
                            cropped_image = cropped_image2
                        else:
                            cropped_image = torch.cat((cropped_image, cropped_image2), dim=0)

                new_seg = SEG(cropped_image, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, seg.control_net_wrapper)
                results.append(new_seg)

            return ((segs[0], results), )
        else:
            return (segs, )

```
