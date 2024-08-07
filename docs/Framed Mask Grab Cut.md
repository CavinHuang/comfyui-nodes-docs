
# Documentation
- Class name: Framed Mask Grab Cut
- Category: Bmad/CV/GrabCut
- Output node: False

此节点应用GrabCut算法来分割图像中的前景和背景,采用基于框架的方法来提高分割精度。它允许将特定区域指定为前景或背景,从而提高生成的遮罩的准确性。

# Input types
## Required
- image
    - 将要应用GrabCut算法的输入图像,用于分割前景和背景。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- thresh
    - 用于确定前景和背景初始分割的阈值。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- iterations
    - GrabCut算法将运行的迭代次数,影响分割的精细程度。
    - Comfy dtype: INT
    - Python dtype: int
- margin
    - 指定框架周围被视为确定背景的边缘大小,有助于更准确的分割。
    - Comfy dtype: INT
    - Python dtype: int
- frame_option
    - 选项用于包含或排除某些框架区域被视为背景,允许对分割过程进行更多控制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- threshold_FGD
    - 将像素分类为确定前景的阈值,有助于初始遮罩的创建。
    - Comfy dtype: INT
    - Python dtype: float
- threshold_PR_FGD
    - 将像素分类为可能前景的阈值,用于细化分割遮罩。
    - Comfy dtype: INT
    - Python dtype: float
- output_format
    - 输出的格式,可以是分割后的遮罩或背景已移除的图像。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 节点的输出,即应用GrabCut算法后获得的前景分割遮罩。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FramedMaskGrabCut:
    frame_options_values = {
        'FULL_FRAME': 0,
        'IGNORE_BOTTOM': 1,
        'IGNORE_TOP': 2,
        'IGNORE_RIGHT': 4,
        'IGNORE_LEFT': 8,
        'IGNORE_HORIZONTAL': 12,
        'IGNORE_VERTICAL': 3,
    }
    frame_options = list(frame_options_values.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "thresh": ("IMAGE",),
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
                    "default": s.frame_options[0]
                }),

                # to only use PR FGD set threshold_FGD to 0
                # to only use only FGD set threshold_FGD to a lower value than threshold_PR_FGD
                # using one of these also works as a safeguard in case thresh has other values besides 0s and 1s
                "threshold_FGD": ("INT", {
                    "default": 250,
                    "min": 0,
                    "max": 255,
                    "step": 1
                }),
                "threshold_PR_FGD": ("INT", {
                    "default": 128,
                    "min": 1,
                    "max": 255,
                    "step": 1
                }),
                "output_format": (image_output_formats_options, {
                    "default": image_output_formats_options[0]
                })
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "grab_cut"
    CATEGORY = "Bmad/CV/GrabCut"

    def grab_cut(self, image, thresh, iterations, margin, frame_option, threshold_FGD, threshold_PR_FGD, output_format):
        image = tensor2opencv(image)
        thresh = tensor2opencv(thresh, 1)

        assert image.shape[:2] == thresh.shape

        fg_model = np.zeros((1, 65), dtype="float")
        bg_model = np.zeros((1, 65), dtype="float")
        mask = np.full(image.shape[:2], cv.GC_PR_BGD, dtype=np.uint8)  # probable background
        # foreground and probable foreground
        if threshold_FGD > threshold_PR_FGD:
            mask[thresh >= threshold_PR_FGD] = cv.GC_PR_FGD
        if threshold_FGD > 0:
            mask[thresh >= threshold_FGD] = cv.GC_FGD

        # check what borders should be painted
        frame_option = self.frame_options_values[frame_option]
        include_bottom = not (frame_option & self.frame_options_values['IGNORE_BOTTOM'])
        include_top = not (frame_option & self.frame_options_values['IGNORE_TOP'])
        include_right = not (frame_option & self.frame_options_values['IGNORE_RIGHT'])
        include_left = not (frame_option & self.frame_options_values['IGNORE_LEFT'])

        # paint the borders as being background
        if include_bottom:
            mask[-margin:, :] = cv.GC_BGD
        if include_top:
            mask[0:margin, :] = cv.GC_BGD
        if include_right:
            mask[:, -margin:] = cv.GC_BGD
        if include_left:
            mask[:, 0:margin] = cv.GC_BGD

        mask, bg_model, fg_model = cv.grabCut(image, mask, None, bg_model, fg_model, iterCount=iterations,
                                              mode=cv.GC_INIT_WITH_MASK)

        # generate mask with "pixels" classified as background/foreground
        output_mask = np.where((mask == cv.GC_BGD) | (mask == cv.GC_PR_BGD), 0, 1)

        output_mask = (output_mask * 255).astype("uint8")

        output_mask = maybe_convert_img(output_mask, 1, image_output_formats_options_map[output_format])
        image = opencv2tensor(output_mask)

        return (image,)

```
