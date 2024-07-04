
# Documentation
- Class name: Image Motion [Dream]
- Category: ✨ Dream/🎥 animation/🔀 transforms
- Output node: False

Image Motion节点通过一系列变换来模拟图像运动，包括放大缩小和在x、y方向上的平移，同时应用重叠遮罩以实现更复杂的运动效果。

# Input types
## Required
- image
    - 将应用运动效果的主要图像。它作为所有后续变换的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- zoom
    - 定义图像的缩放级别，允许放大和缩小效果以模拟运动。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mask_i_feather
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- mask_i_overlap
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- x_translation
    - 控制图像的水平移动，模拟横向运动。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y_translation
    - 管理图像的垂直移动，模拟向上或向下的运动。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame_counter
    - 跟踪处理的帧数，用于随时间变化的动画或效果。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: int
## Optional
- noise
    - 可选的图像，用于为运动效果添加噪声，增强真实感。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- output_resize_width
    - 可选择调整输出图像的宽度，影响最终图像尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- output_resize_height
    - 可选择调整输出图像的高度，影响最终图像尺寸。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - Comfy dtype: IMAGE
    - 应用运动效果后的变换图像。
    - Python dtype: torch.Tensor
- mask1
    - Comfy dtype: MASK
    - 用于创建运动效果的第一个遮罩，经过变换后的结果。
    - Python dtype: torch.Tensor
- mask2
    - Comfy dtype: MASK
    - 应用于增强运动效果的第二个遮罩，变换后的结果。
    - Python dtype: torch.Tensor
- mask3
    - Comfy dtype: MASK
    - 为分层运动效果贡献的第三个遮罩，经过变换后的结果。
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamImageMotion:
    NODE_NAME = "Image Motion"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                            "image": ("IMAGE",),
                            "zoom": ("FLOAT", {"default": 0.0, "min": -10, "max": 10, "step": 0.01}),
                            "mask_1_feather": ("INT", {"default": 0, "min": 0}),
                            "mask_1_overlap": ("INT", {"default": 0, "min": 0}),
                            "mask_2_feather": ("INT", {"default": 10, "min": 0}),
                            "mask_2_overlap": ("INT", {"default": 5, "min": 0}),
                            "mask_3_feather": ("INT", {"default": 15, "min": 0}),
                            "mask_3_overlap": ("INT", {"default": 5, "min": 0}),
                            "x_translation": ("FLOAT", {"default": 0.0, "min": -10, "max": 10, "step": 0.01}),
                            "y_translation": ("FLOAT", {"default": 0.0, "min": -10, "max": 10, "step": 0.01}),
                        } | SharedTypes.frame_counter,
            "optional": {
                "noise": ("IMAGE",),
                "output_resize_width": ("INT", {"default": 0, "min": 0}),
                "output_resize_height": ("INT", {"default": 0, "min": 0})
            }
        }

    CATEGORY = NodeCategories.ANIMATION_TRANSFORMS
    RETURN_TYPES = ("IMAGE", "MASK", "MASK", "MASK")
    RETURN_NAMES = ("image", "mask1", "mask2", "mask3")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def _mk_PIL_image(self, size, color=None, mode="RGB") -> Image:
        im = Image.new(mode=mode, size=size)
        if color:
            im.paste(color, (0, 0, size[0], size[1]))
        return im

    def _convertPILToMask(self, image):
        return torch.from_numpy(numpy.array(image.convert("L")).astype(numpy.float32) / 255.0)

    def _apply_feather(self, pil_image, area, feather):
        feather = min((area[2] - area[0]) // 2 - 1, feather)
        draw = ImageDraw.Draw(pil_image)
        for i in range(1, feather + 1):
            rect = [(area[0] + i - 1, area[1] + i - 1), (area[2] - i + 1, area[3] - i + 1)]
            c = 255 - int(round(255.0 * (i / (feather + 1))))
            draw.rectangle(rect, fill=None, outline=(c, c, c))
        return pil_image

    def _make_mask(self, width, height, selection_area, feather, overlap):
        complete_area = self._mk_PIL_image((width, height), "white")
        draw = ImageDraw.Draw(complete_area)
        (left, top, right, bottom) = selection_area
        area = (left + overlap, top + overlap, right - overlap - 1, bottom - overlap - 1)
        draw.rectangle(area, fill="black", width=0)
        return self._apply_feather(complete_area, area, feather)

    def _make_resizer(self, output_resize_width, output_resize_height):
        def bound(i):
            return min(max(i, 1), 32767)

        if output_resize_height and output_resize_width:
            return lambda img: img.resize((bound(output_resize_width), bound(output_resize_height)), Resampling.NEAREST)
        else:
            return lambda img: img

    def result(self, image: torch.Tensor, zoom, x_translation, y_translation, mask_1_feather, mask_1_overlap,
               mask_2_feather, mask_2_overlap, mask_3_feather, mask_3_overlap, frame_counter: FrameCounter,
               **other):
        def _limit_range(f):
            return max(-1.0, min(1.0, f))

        def _motion(image: DreamImage, batch_counter, zoom, x_translation, y_translation, mask_1_overlap,
                    mask_2_overlap,
                    mask_3_overlap):
            zoom = _limit_range(zoom / frame_counter.frames_per_second)
            x_translation = _limit_range(x_translation / frame_counter.frames_per_second)
            y_translation = _limit_range(y_translation / frame_counter.frames_per_second)
            pil_image = image.pil_image
            sz = self._make_resizer(other.get("output_resize_width", None), other.get("output_resize_height", None))
            noise = other.get("noise", None)
            multiplier = math.pow(2, zoom)
            resized_image = pil_image.resize((round(pil_image.width * multiplier),
                                              round(pil_image.height * multiplier)), Resampling.BILINEAR)

            if noise is None:
                base_image = self._mk_PIL_image(pil_image.size, "black")
            else:
                base_image = convertTensorImageToPIL(noise).resize(pil_image.size, Resampling.BILINEAR)

            selection_offset = (round(x_translation * pil_image.width), round(y_translation * pil_image.height))
            selection = ((pil_image.width - resized_image.width) // 2 + selection_offset[0],
                         (pil_image.height - resized_image.height) // 2 + selection_offset[1],
                         (pil_image.width - resized_image.width) // 2 + selection_offset[0] + resized_image.width,
                         (pil_image.height - resized_image.height) // 2 + selection_offset[1] + resized_image.height)
            base_image.paste(resized_image, selection)

            mask_1_overlap = min(pil_image.width // 3, min(mask_1_overlap, pil_image.height // 3))
            mask_2_overlap = min(pil_image.width // 3, min(mask_2_overlap, pil_image.height // 3))
            mask_3_overlap = min(pil_image.width // 3, min(mask_3_overlap, pil_image.height // 3))
            mask1 = self._make_mask(pil_image.width, pil_image.height, selection, mask_1_feather, mask_1_overlap)
            mask2 = self._make_mask(pil_image.width, pil_image.height, selection, mask_2_feather, mask_2_overlap)
            mask3 = self._make_mask(pil_image.width, pil_image.height, selection, mask_3_feather, mask_3_overlap)

            return (DreamImage(pil_image=sz(base_image)),
                    DreamMask(pil_image=sz(mask1)),
                    DreamMask(pil_image=sz(mask2)),
                    DreamMask(pil_image=sz(mask3)))

        proc = DreamImageProcessor(image,
                                   zoom=zoom,
                                   x_translation=x_translation,
                                   y_translation=y_translation,
                                   mask_1_overlap=mask_1_overlap,
                                   mask_2_overlap=mask_2_overlap,
                                   mask_3_overlap=mask_3_overlap)
        return proc.process(_motion)

```
