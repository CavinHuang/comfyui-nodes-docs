---
tags:
- Image
- ImageComposite
---

# SEGSPaste
## Documentation
- Class name: `SEGSPaste`
- Category: `ImpactPack/Detailer`
- Output node: `False`

The SEGSPaste node is designed for combining multiple segmented images or elements into a single composite image. It focuses on pasting segmented elements onto a base image, allowing for the creation of complex scenes or compositions from simpler segmented parts.
## Input types
### Required
- **`image`**
    - The base image onto which the segmented elements will be pasted. It serves as the backdrop for the composition, influencing the final appearance of the combined image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`segs`**
    - The segmented elements or images to be pasted onto the base image. These segments define the additional components of the scene, contributing to the complexity and detail of the final composition.
    - Comfy dtype: `SEGS`
    - Python dtype: `List[torch.Tensor]`
- **`feather`**
    - Determines the blending edge softness between the pasted segments and the base image, affecting the smoothness of the transitions and integration of elements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - Specifies the opacity level of the pasted segments, allowing for adjustable transparency and layering effects in the composition.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`ref_image_opt`**
    - An optional reference image that can be used for additional context or guidance in the pasting process, enhancing the accuracy or aesthetic of the final image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Outputs the composite image as a combination of the input base image and pasted segmented elements, effectively merging them into a single cohesive visual entity.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)



## Source code
```python
class SEGSPaste:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "image": ("IMAGE", ),
                     "segs": ("SEGS", ),
                     "feather": ("INT", {"default": 5, "min": 0, "max": 100, "step": 1}),
                     "alpha": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
                     },
                "optional": {"ref_image_opt": ("IMAGE", ), }
                }

    RETURN_TYPES = ("IMAGE", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detailer"

    @staticmethod
    def doit(image, segs, feather, alpha=255, ref_image_opt=None):

        segs = core.segs_scale_match(segs, image.shape)

        result = None
        for i, single_image in enumerate(image):
            image_i = single_image.unsqueeze(0).clone()

            for seg in segs[1]:
                ref_image = None
                if ref_image_opt is None and seg.cropped_image is not None:
                    cropped_image = seg.cropped_image
                    if isinstance(cropped_image, np.ndarray):
                        cropped_image = torch.from_numpy(cropped_image)
                    ref_image = cropped_image[i].unsqueeze(0)
                elif ref_image_opt is not None:
                    ref_tensor = ref_image_opt[i].unsqueeze(0)
                    ref_image = crop_image(ref_tensor, seg.crop_region)
                if ref_image is not None:
                    if seg.cropped_mask.ndim == 3 and len(seg.cropped_mask) == len(image):
                        mask = seg.cropped_mask[i]
                    elif seg.cropped_mask.ndim == 3 and len(seg.cropped_mask) > 1:
                        print(f"[Impact Pack] WARN: SEGSPaste - The number of the mask batch({len(seg.cropped_mask)}) and the image batch({len(image)}) are different. Combine the mask frames and apply.")
                        combined_mask = (seg.cropped_mask[0] * 255).to(torch.uint8)

                        for frame_mask in seg.cropped_mask[1:]:
                            combined_mask |= (frame_mask * 255).to(torch.uint8)

                        combined_mask = (combined_mask/255.0).to(torch.float32)
                        mask = utils.to_binary_mask(combined_mask, 0.1)
                    else:  # ndim == 2
                        mask = seg.cropped_mask

                    mask = tensor_gaussian_blur_mask(mask, feather) * (alpha/255)
                    x, y, *_ = seg.crop_region

                    # ensure same device
                    mask.cpu()
                    image_i.cpu()
                    ref_image.cpu()

                    tensor_paste(image_i, ref_image, (x, y), mask)

            if result is None:
                result = image_i
            else:
                result = torch.concat((result, image_i), dim=0)

        return (result, )

```
