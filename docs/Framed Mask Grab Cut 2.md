
# Documentation
- Class name: Framed Mask Grab Cut 2
- Category: Bmad/CV/GrabCut
- Output node: False

此节点应用带有边框选项的GrabCut算法来分割图像中的前景和背景。它允许指定图像中可能为前景或背景的区域，并可以根据边框选项调整分割结果以排除某些边缘区域。

# Input types
## Required
- image
    - 将要应用GrabCut算法的输入图像。这个图像会被预处理以满足算法的要求。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- thresh_maybe
    - 图像的阈值处理版本，表示可能是前景的区域，用于细化分割结果。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- thresh_sure
    - 图像的阈值处理版本，表示确定是前景的区域，进一步细化分割结果。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- iterations
    - GrabCut算法运行的迭代次数，影响分割的准确性和细节程度。
    - Comfy dtype: INT
    - Python dtype: int
- margin
    - 从边框中排除的边缘大小，可用于忽略图像的某些边缘。
    - Comfy dtype: INT
    - Python dtype: int
- frame_option
    - 指定要从前景或背景考虑中排除的图像边缘，允许对分割进行更精细的控制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- binary_threshold
    - 用于在'thresh_maybe'和'thresh_sure'图像中区分可能前景和背景的阈值。
    - Comfy dtype: INT
    - Python dtype: float
- maybe_black_is_sure_background
    - 一个标志，表示在'thresh_maybe'中被识别为可能背景的区域是否应被视为确定的背景，影响最终的分割结果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- output_format
    - 所需的输出格式，可以是指示分割前景的掩码或其他所需格式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 节点的输出是一个经过GrabCut算法分割的图像，其中前景已从背景中分离出来。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FramedMaskGrabCut2:
    # TODO option to ignore probable background in sure_thresh

    frame_options = ['FULL_FRAME', 'IGNORE_BOTTOM', 'IGNORE_TOP', 'IGNORE_RIGHT', 'IGNORE_LEFT', 'IGNORE_HORIZONTAL'
        , 'IGNORE_VERTICAL']
    frame_options_values = {
        'FULL_FRAME': 0,
        'IGNORE_BOTTOM': 1,
        'IGNORE_TOP': 2,
        'IGNORE_RIGHT': 4,
        'IGNORE_LEFT': 8,
        'IGNORE_HORIZONTAL': 12,
        'IGNORE_VERTICAL': 3,
    }

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "thresh_maybe": ("IMAGE",),
                "thresh_sure": ("IMAGE",),
                "iterations": ("INT", {
                    "default": 25,
                    "min": 0,
                    "max": 200,
                    "step": 1
                }),
                "margin": ("INT", {
                    "default": 2,
                    "min": 1,
                    "max": 100,
                    "step": 1
                }),
                "frame_option": (s.frame_options, {
                    "default": 'FULL_FRAME'
                }),
                # source thresh may not be only 0s and 1s, use this as a safeguard
                "binary_threshold": ("INT", {
                    "default": 128,
                    "min": 1,
                    "max": 255,
                    "step": 1
                }),
                "maybe_black_is_sure_background": ("BOOLEAN", {"default": False}),
                "output_format": (image_output_formats_options, {
                    "default": image_output_formats_options[0]
                })
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "grab_cut"

    CATEGORY = "Bmad/CV/GrabCut"

    def grab_cut(self, image, thresh_maybe, thresh_sure, iterations,
                 margin, frame_option, binary_threshold,
                 maybe_black_is_sure_background, output_format):
        image = tensor2opencv(image)

        thresh_maybe = tensor2opencv(thresh_maybe, 1)
        thresh_sure = tensor2opencv(thresh_sure, 1)

        fg_model = np.zeros((1, 65), dtype="float")
        bg_model = np.zeros((1, 65), dtype="float")
        mask = np.full(image.shape[:2], cv.GC_PR_BGD, dtype=np.uint8)  # probable background
        mask[thresh_maybe >= binary_threshold] = cv.GC_PR_FGD  # probable foreground
        mask[thresh_sure >= binary_threshold] = cv.GC_FGD  # foreground

        frame_option = self.frame_options_values[frame_option]
        include_bottom = not (frame_option & self.frame_options_values['IGNORE_BOTTOM'])
        include_top = not (frame_option & self.frame_options_values['IGNORE_TOP'])
        include_right = not (frame_option & self.frame_options_values['IGNORE_RIGHT'])
        include_left = not (frame_option & self.frame_options_values['IGNORE_LEFT'])

        if include_bottom:
            mask[-margin:, :] = cv.GC_BGD
        if include_top:
            mask[0:margin, :] = cv.GC_BGD
        if include_right:
            mask[:, -margin:] = cv.GC_BGD
        if include_left:
            mask[:, 0:margin] = cv.GC_BGD

        if maybe_black_is_sure_background:
            mask[thresh_maybe < binary_threshold] = cv.GC_BGD  # background

        mask, bg_model, fg_model = cv.grabCut(image, mask, None, bg_model, fg_model, iterCount=iterations,
                                              mode=cv.GC_INIT_WITH_MASK)

        # generate mask with "pixels" classified as background/foreground
        output_mask = np.where((mask == cv.GC_BGD) | (mask == cv.GC_PR_BGD), 0, 1)
        output_mask = (output_mask * 255).astype("uint8")

        output_mask = maybe_convert_img(output_mask, 1, image_output_formats_options_map[output_format])
        image = opencv2tensor(output_mask)

        return (image,)

```
