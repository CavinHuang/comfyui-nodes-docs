
# Documentation
- Class name: FL_PixelSort
- Category: 🏵️Fill Nodes
- Output node: False
- Repo Ref: https://github.com/fylipeclick/ClickFill

FL_PixelSort节点可以对图像应用像素排序效果，这种效果基于图像的色相值进行排序，从而实现对图像纹理的艺术化处理。该节点支持通过方向、阈值、平滑度和旋转等参数的自定义设置，以达到各种视觉效果。

# Input types
## Required
- images
    - 需要处理的图像集合。这些图像将根据其色相值进行排序，从而实现创意性的重构和处理。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
## Optional
- direction
    - 指定像素排序过程的方向，可选'Horizontal'（水平）或'Vertical'（垂直）。这会影响图像上排序效果的方向。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- threshold
    - 决定触发排序所需的色相变化敏感度的值。较低的阈值会导致基于较小的色相差异进行更积极的排序。
    - Comfy dtype: FLOAT
    - Python dtype: float
- smoothing
    - 控制已排序区域和未排序区域之间过渡的平滑度，值越高，过渡越平滑。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotation
    - 在排序之前对图像应用旋转，可能的值表示90度旋转的次数。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 应用了像素排序效果的处理后图像，基于指定的参数进行处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FL_PixelSort:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
            "optional": {
                "direction": (["Horizontal", "Vertical"],),
                "threshold": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "smoothing": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 1.0, "step": 0.01}),
                "rotation": ("INT", {"default": 0, "min": 0, "max": 3, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "pixel_sort_hue"
    CATEGORY = "🏵️Fill Nodes"

    def t2p(self, t):
        if t is not None:
            i = 255.0 * t.cpu().numpy().squeeze()
            p = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
        return p

    def hue(self, pixel):
        r, g, b = pixel
        h, _, _ = rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
        return h

    def pixel_sort_hue(self, images, direction="Horizontal", threshold=0.5, smoothing=0.1, rotation=0):
        out = []
        total_images = len(images)
        for i, img in enumerate(images, start=1):
            p = self.t2p(img)
            sorted_image = self.sort_pixels(p, self.hue, threshold, smoothing, rotation)
            o = np.array(sorted_image.convert("RGB")).astype(np.float32) / 255.0
            o = torch.from_numpy(o).unsqueeze(0)
            out.append(o)

            # Print progress update
            progress = i / total_images * 100
            sys.stdout.write(f"\rProcessing images: {progress:.2f}%")
            sys.stdout.flush()

        # Print a new line after the progress update
        print()

        out = torch.cat(out, 0)
        return (out,)

    def sort_pixels(self, image, value, threshold, smoothing, rotation=0):
        pixels = np.rot90(np.array(image), rotation)
        values = np.apply_along_axis(value, 2, pixels)
        edges = np.apply_along_axis(lambda row: np.convolve(row, [-1, 1], 'same'), 0, values > threshold)
        edges = np.maximum(edges, 0)
        edges = np.minimum(edges, 1)
        edges = np.convolve(edges.flatten(), np.ones(int(smoothing * pixels.shape[1])), 'same').reshape(edges.shape)
        intervals = [np.flatnonzero(row) for row in edges]

        for row, key in enumerate(values):
            order = np.split(key, intervals[row])
            for index, interval in enumerate(order[1:]):
                order[index + 1] = np.argsort(interval) + intervals[row][index]
            order[0] = range(order[0].size)
            order = np.concatenate(order)

            for channel in range(3):
                pixels[row, :, channel] = pixels[row, order.astype('uint32'), channel]

        return Image.fromarray(np.rot90(pixels, -rotation))

```
