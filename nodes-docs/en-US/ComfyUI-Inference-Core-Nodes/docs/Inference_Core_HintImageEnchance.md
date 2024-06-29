---
tags:
- DepthMap
- Image
- ImagePreprocessing
---

# [Inference.Core] Enchance And Resize Hint Images
## Documentation
- Class name: `Inference_Core_HintImageEnchance`
- Category: `ControlNet Preprocessors`
- Output node: `False`

The `Inference_Core_HintImageEnchance` node is designed to preprocess hint images for image generation tasks, enhancing and resizing them according to specified dimensions and modes. It supports operations such as resizing to fit within given dimensions, outer and inner fitting, and applying enhancements like binary thresholding, edge detection, and inpainting based on the image's alpha channel.
## Input types
### Required
- **`hint_image`**
    - The hint image to be processed, which can be enhanced and resized for better suitability in image generation tasks.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`image_gen_width`**
    - The target width for the generated image, guiding the resizing process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_gen_height`**
    - The target height for the generated image, guiding the resizing process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resize_mode`**
    - The mode of resizing to be applied, determining how the hint image is adjusted to fit the target dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `ResizeMode`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed hint images, enhanced and resized according to the specified parameters, ready for use in image generation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class HintImageEnchance:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "hint_image": ("IMAGE", ),
                "image_gen_width": ("INT", {"default": 512, "min": 64, "max": MAX_IMAGEGEN_RESOLUTION, "step": 8}),
                "image_gen_height": ("INT", {"default": 512, "min": 64, "max": MAX_IMAGEGEN_RESOLUTION, "step": 8}),
                #https://github.com/comfyanonymous/ComfyUI/blob/c910b4a01ca58b04e5d4ab4c747680b996ada02b/nodes.py#L854
                "resize_mode": (RESIZE_MODES, {"default": ResizeMode.RESIZE.value})
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors"
    def execute(self, hint_image, image_gen_width, image_gen_height, resize_mode):
        outs = []
        for single_hint_image in hint_image:
            np_hint_image = np.asarray(single_hint_image * 255., dtype=np.uint8)

            if resize_mode == ResizeMode.RESIZE.value:
                np_hint_image = self.execute_resize(np_hint_image, image_gen_width, image_gen_height)
            elif resize_mode == ResizeMode.OUTER_FIT.value:
                np_hint_image = self.execute_outer_fit(np_hint_image, image_gen_width, image_gen_height)
            else:
                np_hint_image = self.execute_inner_fit(np_hint_image, image_gen_width, image_gen_height)
            
            outs.append(torch.from_numpy(np_hint_image.astype(np.float32) / 255.0))
        
        return (torch.stack(outs, dim=0),)
    
    def execute_resize(self, detected_map, w, h):
        detected_map = self.high_quality_resize(detected_map, (w, h))
        detected_map = safe_numpy(detected_map)
        return detected_map
    
    def execute_outer_fit(self, detected_map, w, h):
        old_h, old_w, _ = detected_map.shape
        old_w = float(old_w)
        old_h = float(old_h)
        k0 = float(h) / old_h
        k1 = float(w) / old_w
        safeint = lambda x: int(np.round(x))
        k = min(k0, k1)
        
        borders = np.concatenate([detected_map[0, :, :], detected_map[-1, :, :], detected_map[:, 0, :], detected_map[:, -1, :]], axis=0)
        high_quality_border_color = np.median(borders, axis=0).astype(detected_map.dtype)
        if len(high_quality_border_color) == 4:
            # Inpaint hijack
            high_quality_border_color[3] = 255
        high_quality_background = np.tile(high_quality_border_color[None, None], [h, w, 1])
        detected_map = self.high_quality_resize(detected_map, (safeint(old_w * k), safeint(old_h * k)))
        new_h, new_w, _ = detected_map.shape
        pad_h = max(0, (h - new_h) // 2)
        pad_w = max(0, (w - new_w) // 2)
        high_quality_background[pad_h:pad_h + new_h, pad_w:pad_w + new_w] = detected_map
        detected_map = high_quality_background
        detected_map = safe_numpy(detected_map)
        return detected_map
    
    def execute_inner_fit(self, detected_map, w, h):
        old_h, old_w, _ = detected_map.shape
        old_w = float(old_w)
        old_h = float(old_h)
        k0 = float(h) / old_h
        k1 = float(w) / old_w
        safeint = lambda x: int(np.round(x))
        k = max(k0, k1)

        detected_map = self.high_quality_resize(detected_map, (safeint(old_w * k), safeint(old_h * k)))
        new_h, new_w, _ = detected_map.shape
        pad_h = max(0, (new_h - h) // 2)
        pad_w = max(0, (new_w - w) // 2)
        detected_map = detected_map[pad_h:pad_h+h, pad_w:pad_w+w]
        detected_map = safe_numpy(detected_map)
        return detected_map

    def high_quality_resize(self, x, size):
        # Written by lvmin
        # Super high-quality control map up-scaling, considering binary, seg, and one-pixel edges

        inpaint_mask = None
        if x.ndim == 3 and x.shape[2] == 4:
            inpaint_mask = x[:, :, 3]
            x = x[:, :, 0:3]

        if x.shape[0] != size[1] or x.shape[1] != size[0]:
            new_size_is_smaller = (size[0] * size[1]) < (x.shape[0] * x.shape[1])
            new_size_is_bigger = (size[0] * size[1]) > (x.shape[0] * x.shape[1])
            unique_color_count = len(get_unique_axis0(x.reshape(-1, x.shape[2])))
            is_one_pixel_edge = False
            is_binary = False
            if unique_color_count == 2:
                is_binary = np.min(x) < 16 and np.max(x) > 240
                if is_binary:
                    xc = x
                    xc = cv2.erode(xc, np.ones(shape=(3, 3), dtype=np.uint8), iterations=1)
                    xc = cv2.dilate(xc, np.ones(shape=(3, 3), dtype=np.uint8), iterations=1)
                    one_pixel_edge_count = np.where(xc < x)[0].shape[0]
                    all_edge_count = np.where(x > 127)[0].shape[0]
                    is_one_pixel_edge = one_pixel_edge_count * 2 > all_edge_count

            if 2 < unique_color_count < 200:
                interpolation = cv2.INTER_NEAREST
            elif new_size_is_smaller:
                interpolation = cv2.INTER_AREA
            else:
                interpolation = cv2.INTER_CUBIC  # Must be CUBIC because we now use nms. NEVER CHANGE THIS

            y = cv2.resize(x, size, interpolation=interpolation)
            if inpaint_mask is not None:
                inpaint_mask = cv2.resize(inpaint_mask, size, interpolation=interpolation)

            if is_binary:
                y = np.mean(y.astype(np.float32), axis=2).clip(0, 255).astype(np.uint8)
                if is_one_pixel_edge:
                    y = nake_nms(y)
                    _, y = cv2.threshold(y, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
                    y = lvmin_thin(y, prunings=new_size_is_bigger)
                else:
                    _, y = cv2.threshold(y, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
                y = np.stack([y] * 3, axis=2)
        else:
            y = x

        if inpaint_mask is not None:
            inpaint_mask = (inpaint_mask > 127).astype(np.float32) * 255.0
            inpaint_mask = inpaint_mask[:, :, None].clip(0, 255).astype(np.uint8)
            y = np.concatenate([y, inpaint_mask], axis=2)

        return y

```
