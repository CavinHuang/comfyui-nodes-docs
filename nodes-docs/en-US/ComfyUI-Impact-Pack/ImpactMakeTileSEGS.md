---
tags:
- SEGSPrep
- Segmentation
---

# Make Tile SEGS
## Documentation
- Class name: `ImpactMakeTileSEGS`
- Category: `ImpactPack/__for_testing`
- Output node: `False`

The ImpactMakeTileSEGS node is designed to process segmentation masks (SEGS) to generate tiled versions of these masks based on specified bounding box sizes and overlap parameters. It applies various filtering and adjustment techniques to ensure the tiles are generated in a manner that respects the original segmentation's integrity and spatial distribution, accommodating for both inclusion and exclusion criteria, as well as handling irregularities in mask shapes.
## Input types
### Required
- **`images`**
    - The images to be processed for tiling, serving as the base for segmentation and subsequent tiling operations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`bbox_size`**
    - Determines the size of the bounding box for each tile, directly influencing the granularity of the tiling output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_factor`**
    - A factor that influences the cropping of images during the tiling process, affecting the size and area of the resulting tiles.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`min_overlap`**
    - Specifies the minimum overlap between adjacent tiles, ensuring a seamless transition and coverage across tiles.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`filter_segs_dilation`**
    - Specifies the dilation applied to segmentation masks, adjusting the area covered by each segment for inclusion or exclusion in the tiling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mask_irregularity`**
    - Defines the level of irregularity to be applied to the masks, affecting the shape and edges of the tiles.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`irregular_mask_mode`**
    - Specifies the mode of generating irregular masks, influencing the quality and reuse strategy of masks for tiling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`filter_in_segs_opt`**
    - Defines segmentation masks to be included in the tiling process, allowing for targeted tiling within specified regions of interest.
    - Comfy dtype: `SEGS`
    - Python dtype: `Optional[List[SEG]]`
- **`filter_out_segs_opt`**
    - Specifies segmentation masks to be excluded from the tiling process, enhancing the node's ability to focus on regions of interest by removing undesired segments.
    - Comfy dtype: `SEGS`
    - Python dtype: `Optional[List[SEG]]`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The output consists of segmented tiles, each representing a portion of the original image with applied filters and adjustments for tiling.
    - Python dtype: `List[SEG]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SEGSPreview](../../ComfyUI-Impact-Pack/Nodes/SEGSPreview.md)
    - [ImpactSEGSConcat](../../ComfyUI-Impact-Pack/Nodes/ImpactSEGSConcat.md)



## Source code
```python
class MakeTileSEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "images": ("IMAGE", ),
                     "bbox_size": ("INT", {"default": 512, "min": 64, "max": 4096, "step": 8}),
                     "crop_factor": ("FLOAT", {"default": 3.0, "min": 1.0, "max": 10, "step": 0.1}),
                     "min_overlap": ("INT", {"default": 5, "min": 0, "max": 512, "step": 1}),
                     "filter_segs_dilation": ("INT", {"default": 20, "min": -255, "max": 255, "step": 1}),
                     "mask_irregularity": ("FLOAT", {"default": 0, "min": 0, "max": 1.0, "step": 0.01}),
                     "irregular_mask_mode": (["Reuse fast", "Reuse quality", "All random fast", "All random quality"],)
                    },
                "optional": {
                    "filter_in_segs_opt": ("SEGS", ),
                    "filter_out_segs_opt": ("SEGS", ),
                    }
                }

    RETURN_TYPES = ("SEGS",)

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/__for_testing"

    def doit(self, images, bbox_size, crop_factor, min_overlap, filter_segs_dilation, mask_irregularity=0, irregular_mask_mode="Reuse fast", filter_in_segs_opt=None, filter_out_segs_opt=None):
        if bbox_size <= 2*min_overlap:
            new_min_overlap = bbox_size / 2
            print(f"[MakeTileSEGS] min_overlap should be greater than bbox_size. (value changed: {min_overlap} => {new_min_overlap})")
            min_overlap = new_min_overlap

        _, ih, iw, _ = images.size()

        mask_cache = None
        mask_quality = 512
        if mask_irregularity > 0:
            if irregular_mask_mode == "Reuse fast":
                mask_quality = 128
                mask_cache = np.zeros((128, 128)).astype(np.float32)
                core.random_mask(mask_cache, (0, 0, 128, 128), factor=mask_irregularity, size=mask_quality)
            elif irregular_mask_mode == "Reuse quality":
                mask_quality = 512
                mask_cache = np.zeros((512, 512)).astype(np.float32)
                core.random_mask(mask_cache, (0, 0, 512, 512), factor=mask_irregularity, size=mask_quality)
            elif irregular_mask_mode == "All random fast":
                mask_quality = 512

        # compensate overlap/bbox_size for irregular mask
        if mask_irregularity > 0:
            compensate = max(6, int(mask_quality * mask_irregularity / 4))
            min_overlap += compensate
            bbox_size += compensate*2

        # create exclusion mask
        if filter_out_segs_opt is not None:
            exclusion_mask = core.segs_to_combined_mask(filter_out_segs_opt)
            exclusion_mask = utils.make_3d_mask(exclusion_mask)
            exclusion_mask = utils.resize_mask(exclusion_mask, (ih, iw))
            exclusion_mask = dilate_mask(exclusion_mask.cpu().numpy(), filter_segs_dilation)
        else:
            exclusion_mask = None

        if filter_in_segs_opt is not None:
            and_mask = core.segs_to_combined_mask(filter_in_segs_opt)
            and_mask = utils.make_3d_mask(and_mask)
            and_mask = utils.resize_mask(and_mask, (ih, iw))
            and_mask = dilate_mask(and_mask.cpu().numpy(), filter_segs_dilation)

            a, b = core.mask_to_segs(and_mask, True, 1.0, False, 0)
            if len(b) == 0:
                return ((a, b),)

            start_x, start_y, c, d = b[0].crop_region
            w = c - start_x
            h = d - start_y
        else:
            start_x = 0
            start_y = 0
            h, w = ih, iw
            and_mask = None

        # calculate tile factors
        if bbox_size > h or bbox_size > w:
            new_bbox_size = min(bbox_size, min(w, h))
            print(f"[MaskTileSEGS] bbox_size is greater than resolution (value changed: {bbox_size} => {new_bbox_size}")
            bbox_size = new_bbox_size

        n_horizontal = math.ceil(w / (bbox_size - min_overlap))
        n_vertical = math.ceil(h / (bbox_size - min_overlap))

        w_overlap_sum = (bbox_size * n_horizontal) - w
        if w_overlap_sum < 0:
            n_horizontal += 1
            w_overlap_sum = (bbox_size * n_horizontal) - w

        w_overlap_size = 0 if n_horizontal == 1 else int(w_overlap_sum/(n_horizontal-1))

        h_overlap_sum = (bbox_size * n_vertical) - h
        if h_overlap_sum < 0:
            n_vertical += 1
            h_overlap_sum = (bbox_size * n_vertical) - h

        h_overlap_size = 0 if n_vertical == 1 else int(h_overlap_sum/(n_vertical-1))

        new_segs = []

        if w_overlap_size == bbox_size:
            n_horizontal = 1

        if h_overlap_size == bbox_size:
            n_vertical = 1

        y = start_y
        for j in range(0, n_vertical):
            x = start_x
            for i in range(0, n_horizontal):
                x1 = x
                y1 = y

                if x+bbox_size < iw-1:
                    x2 = x+bbox_size
                else:
                    x2 = iw
                    x1 = iw-bbox_size

                if y+bbox_size < ih-1:
                    y2 = y+bbox_size
                else:
                    y2 = ih
                    y1 = ih-bbox_size

                bbox = x1, y1, x2, y2
                crop_region = make_crop_region(iw, ih, bbox, crop_factor)
                cx1, cy1, cx2, cy2 = crop_region

                mask = np.zeros((cy2 - cy1, cx2 - cx1)).astype(np.float32)

                rel_left = x1 - cx1
                rel_top = y1 - cy1
                rel_right = x2 - cx1
                rel_bot = y2 - cy1

                if mask_irregularity > 0:
                    if mask_cache is not None:
                        core.adaptive_mask_paste(mask, mask_cache, (rel_left, rel_top, rel_right, rel_bot))
                    else:
                        core.random_mask(mask, (rel_left, rel_top, rel_right, rel_bot), factor=mask_irregularity, size=mask_quality)

                    # corner filling
                    if rel_left == 0:
                        pad = int((x2 - x1) / 8)
                        mask[rel_top:rel_bot, :pad] = 1.0

                    if rel_top == 0:
                        pad = int((y2 - y1) / 8)
                        mask[:pad, rel_left:rel_right] = 1.0

                    if rel_right == mask.shape[1]:
                        pad = int((x2 - x1) / 8)
                        mask[rel_top:rel_bot, -pad:] = 1.0

                    if rel_bot == mask.shape[0]:
                        pad = int((y2 - y1) / 8)
                        mask[-pad:, rel_left:rel_right] = 1.0
                else:
                    mask[rel_top:rel_bot, rel_left:rel_right] = 1.0

                mask = torch.tensor(mask)

                if exclusion_mask is not None:
                    exclusion_mask_cropped = exclusion_mask[cy1:cy2, cx1:cx2]
                    mask[exclusion_mask_cropped != 0] = 0.0

                if and_mask is not None:
                    and_mask_cropped = and_mask[cy1:cy2, cx1:cx2]
                    mask[and_mask_cropped == 0] = 0.0

                is_mask_zero = torch.all(mask == 0.0).item()

                if not is_mask_zero:
                    item = SEG(None, mask.numpy(), 1.0, crop_region, bbox, "", None)
                    new_segs.append(item)

                x += bbox_size - w_overlap_size
            y += bbox_size - h_overlap_size

        res = (ih, iw), new_segs  # segs
        return (res,)

```
