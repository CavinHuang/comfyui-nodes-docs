# Documentation
- Class name: WAS_Image_Pixelate
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Pixelate 节点旨在将图像转换为像素化艺术风格。它通过减少图像中使用的颜色数量并应用各种像素化技术来实现这一点。节点可以处理一系列参数以定制像素化过程，包括大小、颜色计数和抖动选项，从而为最终输出提供了高度的创意控制。

# Input types
## Required
- images
    - 输入图像将由节点处理。这些图像将经历像素化转换，以创建风格化的像素化版本。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or List[PIL.Image.Image]
## Optional
- pixelation_size
    - 像素化效果的目标大小。较大的值会导致更明显的像素化，而较小的值则创造出更精细、像素化程度较低的外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- num_colors
    - 将图像减少到的颜色数量。此参数直接影响像素化结果的复杂性，数值越低，导致更抽象的表现。
    - Comfy dtype: FLOAT
    - Python dtype: float
- init_mode
    - 用于确定像素化图像颜色的k-means聚类算法的初始化模式。
    - Comfy dtype: COMBO['k-means++', 'random', 'none']
    - Python dtype: str
- max_iterations
    - k-means聚类算法运行的最大迭代次数。更多的迭代可以导致更好的颜色聚类，但可能会增加处理时间。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dither
    - 一个布尔标志，用于确定是否对像素化图像应用抖动。抖动可以帮助在颜色之间创建更平滑的过渡，但可能会牺牲一些细节。
    - Comfy dtype: COMBO['False', 'True']
    - Python dtype: bool
- dither_mode
    - 如果启用了抖动，则应用的抖动模式。不同的模式可以在最终图像中产生不同的视觉效果。
    - Comfy dtype: COMBO['FloydSteinberg', 'Ordered']
    - Python dtype: str
- color_palettes
    - 用于像素化的可选自定义调色板。每个调色板应该是一个十六进制颜色字符串的列表。
    - Comfy dtype: LIST
    - Python dtype: List[str]
- color_palette_mode
    - 从调色板映射颜色到像素化图像时使用的模式。
    - Comfy dtype: COMBO['Brightness', 'BrightnessAndTonal', 'Linear', 'Tonal']
    - Python dtype: str
- reverse_palette
    - 一个标志，指示在应用于像素化图像时是否反转调色板中颜色的顺序。
    - Comfy dtype: COMBO['False', 'True']
    - Python dtype: bool

# Output types
- images
    - 使用指定参数处理后的像素化图像的结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or List[PIL.Image.Image]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Pixelate:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'pixelation_size': ('FLOAT', {'default': 164, 'min': 16, 'max': 480, 'step': 1}), 'num_colors': ('FLOAT', {'default': 16, 'min': 2, 'max': 256, 'step': 1}), 'init_mode': (['k-means++', 'random', 'none'],), 'max_iterations': ('FLOAT', {'default': 100, 'min': 1, 'max': 256, 'step': 1}), 'dither': (['False', 'True'],), 'dither_mode': (['FloydSteinberg', 'Ordered'],)}, 'optional': {'color_palettes': ('LIST', {'forceInput': True}), 'color_palette_mode': (['Brightness', 'BrightnessAndTonal', 'Linear', 'Tonal'],), 'reverse_palette': (['False', 'True'],)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('images',)
    FUNCTION = 'image_pixelate'
    CATEGORY = 'WAS Suite/Image/Process'

    def image_pixelate(self, images, pixelation_size=164, num_colors=16, init_mode='random', max_iterations=100, color_palettes=None, color_palette_mode='Linear', reverse_palette='False', dither='False', dither_mode='FloydSteinberg'):
        if 'scikit-learn' not in packages():
            install_package('scikit-learn')
        pixelation_size = int(pixelation_size)
        num_colors = int(num_colors)
        max_iterations = int(max_iterations)
        color_palette_mode = color_palette_mode
        dither = dither == 'True'
        color_palettes_list = []
        if color_palettes:
            for palette in color_palettes:
                color_palettes_list.append([color.strip() for color in palette.splitlines() if not color.startswith('//') or not color.startswith(';')])
        reverse_palette = True if reverse_palette == 'True' else False
        return (self.pixel_art_batch(images, pixelation_size, num_colors, init_mode, max_iterations, 42, color_palettes_list if color_palettes_list else None, color_palette_mode, reverse_palette, dither, dither_mode),)

    def pixel_art_batch(self, batch, min_size, num_colors=16, init_mode='random', max_iter=100, random_state=42, palette=None, palette_mode='Linear', reverse_palette=False, dither=False, dither_mode='FloydSteinberg'):
        from sklearn.cluster import KMeans
        hex_palette_to_rgb = lambda hex: tuple((int(hex[i:i + 2], 16) for i in (0, 2, 4)))

        def flatten_colors(image, num_colors, init_mode='random', max_iter=100, random_state=42):
            np_image = np.array(image)
            pixels = np_image.reshape(-1, 3)
            kmeans = KMeans(n_clusters=num_colors, init=init_mode, max_iter=max_iter, tol=0.001, random_state=random_state, n_init='auto')
            labels = kmeans.fit_predict(pixels)
            colors = kmeans.cluster_centers_.astype(np.uint8)
            flattened_pixels = colors[labels]
            flattened_image = flattened_pixels.reshape(np_image.shape)
            return Image.fromarray(flattened_image)

        def dither_image(image, mode, nc):

            def clamp(value, min_value=0, max_value=255):
                return max(min(value, max_value), min_value)

            def get_new_val(old_val, nc):
                return np.round(old_val * (nc - 1)) / (nc - 1)

            def fs_dither(img, nc):
                arr = np.array(img, dtype=float) / 255
                (new_width, new_height) = img.size
                for ir in range(new_height):
                    for ic in range(new_width):
                        old_val = arr[ir, ic].copy()
                        new_val = get_new_val(old_val, nc)
                        arr[ir, ic] = new_val
                        err = old_val - new_val
                        if ic < new_width - 1:
                            arr[ir, ic + 1] += err * 7 / 16
                        if ir < new_height - 1:
                            if ic > 0:
                                arr[ir + 1, ic - 1] += err * 3 / 16
                            arr[ir + 1, ic] += err * 5 / 16
                            if ic < new_width - 1:
                                arr[ir + 1, ic + 1] += err / 16
                carr = np.array(arr * 255, dtype=np.uint8)
                return Image.fromarray(carr)

            def ordered_dither(img, nc):
                (width, height) = img.size
                dither_matrix = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]
                dithered_image = Image.new('RGB', (width, height))
                num_colors = min(2 ** int(np.log2(nc)), 16)
                for y in range(height):
                    for x in range(width):
                        old_pixel = img.getpixel((x, y))
                        threshold = dither_matrix[x % 4][y % 4] * num_colors
                        new_pixel = tuple((int(c * num_colors / 256) * (256 // num_colors) for c in old_pixel))
                        error = tuple((old - new for (old, new) in zip(old_pixel, new_pixel)))
                        dithered_image.putpixel((x, y), new_pixel)
                        if x < width - 1:
                            neighboring_pixel = img.getpixel((x + 1, y))
                            neighboring_pixel = tuple((int(c * num_colors / 256) * (256 // num_colors) for c in neighboring_pixel))
                            neighboring_error = tuple((neighboring - new for (neighboring, new) in zip(neighboring_pixel, new_pixel)))
                            neighboring_pixel = tuple((int(clamp(pixel + error * 7 / 16)) for (pixel, error) in zip(neighboring_pixel, neighboring_error)))
                            img.putpixel((x + 1, y), neighboring_pixel)
                        if x < width - 1 and y < height - 1:
                            neighboring_pixel = img.getpixel((x + 1, y + 1))
                            neighboring_pixel = tuple((int(c * num_colors / 256) * (256 // num_colors) for c in neighboring_pixel))
                            neighboring_error = tuple((neighboring - new for (neighboring, new) in zip(neighboring_pixel, new_pixel)))
                            neighboring_pixel = tuple((int(clamp(pixel + error * 1 / 16)) for (pixel, error) in zip(neighboring_pixel, neighboring_error)))
                            img.putpixel((x + 1, y + 1), neighboring_pixel)
                        if y < height - 1:
                            neighboring_pixel = img.getpixel((x, y + 1))
                            neighboring_pixel = tuple((int(c * num_colors / 256) * (256 // num_colors) for c in neighboring_pixel))
                            neighboring_error = tuple((neighboring - new for (neighboring, new) in zip(neighboring_pixel, new_pixel)))
                            neighboring_pixel = tuple((int(clamp(pixel + error * 5 / 16)) for (pixel, error) in zip(neighboring_pixel, neighboring_error)))
                            img.putpixel((x, y + 1), neighboring_pixel)
                        if x > 0 and y < height - 1:
                            neighboring_pixel = img.getpixel((x - 1, y + 1))
                            neighboring_pixel = tuple((int(c * num_colors / 256) * (256 // num_colors) for c in neighboring_pixel))
                            neighboring_error = tuple((neighboring - new for (neighboring, new) in zip(neighboring_pixel, new_pixel)))
                            neighboring_pixel = tuple((int(clamp(pixel + error * 3 / 16)) for (pixel, error) in zip(neighboring_pixel, neighboring_error)))
                            img.putpixel((x - 1, y + 1), neighboring_pixel)
                return dithered_image
            if mode == 'FloydSteinberg':
                return fs_dither(image, nc)
            elif mode == 'Ordered':
                return ordered_dither(image, nc)
            else:
                cstr(f'Inavlid dithering mode `{mode}` selected.').error.print()
                return image
            return image

        def color_palette_from_hex_lines(image, colors, palette_mode='Linear', reverse_palette=False):

            def color_distance(color1, color2):
                (r1, g1, b1) = color1
                (r2, g2, b2) = color2
                return np.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)

            def find_nearest_color_index(color, palette):
                distances = [color_distance(color, palette_color) for palette_color in palette]
                return distances.index(min(distances))

            def find_nearest_color_index_tonal(color, palette):
                distances = [color_distance_tonal(color, palette_color) for palette_color in palette]
                return distances.index(min(distances))

            def find_nearest_color_index_both(color, palette):
                distances = [color_distance_both(color, palette_color) for palette_color in palette]
                return distances.index(min(distances))

            def color_distance_tonal(color1, color2):
                (r1, g1, b1) = color1
                (r2, g2, b2) = color2
                l1 = 0.299 * r1 + 0.587 * g1 + 0.114 * b1
                l2 = 0.299 * r2 + 0.587 * g2 + 0.114 * b2
                return abs(l1 - l2)

            def color_distance_both(color1, color2):
                (r1, g1, b1) = color1
                (r2, g2, b2) = color2
                l1 = 0.299 * r1 + 0.587 * g1 + 0.114 * b1
                l2 = 0.299 * r2 + 0.587 * g2 + 0.114 * b2
                return abs(l1 - l2) + sum((abs(c1 - c2) for (c1, c2) in zip(color1, color2)))

            def color_distance(color1, color2):
                return sum((abs(c1 - c2) for (c1, c2) in zip(color1, color2)))
            color_palette = [hex_palette_to_rgb(color.lstrip('#')) for color in colors]
            if reverse_palette:
                color_palette = color_palette[::-1]
            np_image = np.array(image)
            labels = np_image.reshape(image.size[1], image.size[0], -1)
            (width, height) = image.size
            new_image = Image.new('RGB', image.size)
            if palette_mode == 'Linear':
                color_palette_indices = list(range(len(color_palette)))
            elif palette_mode == 'Brightness':
                color_palette_indices = sorted(range(len(color_palette)), key=lambda i: sum(color_palette[i]) / 3)
            elif palette_mode == 'Tonal':
                color_palette_indices = sorted(range(len(color_palette)), key=lambda i: color_distance(color_palette[i], (128, 128, 128)))
            elif palette_mode == 'BrightnessAndTonal':
                color_palette_indices = sorted(range(len(color_palette)), key=lambda i: (sum(color_palette[i]) / 3, color_distance(color_palette[i], (128, 128, 128))))
            else:
                raise ValueError(f'Unsupported mapping mode: {palette_mode}')
            for x in range(width):
                for y in range(height):
                    pixel_color = labels[y, x, :]
                    if palette_mode == 'Linear':
                        color_index = pixel_color[0] % len(color_palette)
                    elif palette_mode == 'Brightness':
                        color_index = find_nearest_color_index(pixel_color, [color_palette[i] for i in color_palette_indices])
                    elif palette_mode == 'Tonal':
                        color_index = find_nearest_color_index_tonal(pixel_color, [color_palette[i] for i in color_palette_indices])
                    elif palette_mode == 'BrightnessAndTonal':
                        color_index = find_nearest_color_index_both(pixel_color, [color_palette[i] for i in color_palette_indices])
                    else:
                        raise ValueError(f'Unsupported mapping mode: {palette_mode}')
                    color = color_palette[color_palette_indices[color_index]]
                    new_image.putpixel((x, y), color)
            return new_image
        pil_images = [tensor2pil(image) for image in batch]
        pixel_art_images = []
        original_sizes = []
        total_images = len(pil_images)
        for image in pil_images:
            (width, height) = image.size
            original_sizes.append((width, height))
            if max(width, height) > min_size:
                if width > height:
                    new_width = min_size
                    new_height = int(height * (min_size / width))
                else:
                    new_height = min_size
                    new_width = int(width * (min_size / height))
                pixel_art_images.append(image.resize((new_width, int(new_height)), Image.NEAREST))
            else:
                pixel_art_images.append(image)
        if init_mode != 'none':
            pixel_art_images = [flatten_colors(image, num_colors, init_mode) for image in pixel_art_images]
        if dither:
            pixel_art_images = [dither_image(image, dither_mode, num_colors) for image in pixel_art_images]
        if palette:
            pixel_art_images = [color_palette_from_hex_lines(pixel_art_image, palette[i], palette_mode, reverse_palette) for (i, pixel_art_image) in enumerate(pixel_art_images)]
        else:
            pixel_art_images = pixel_art_images
        pixel_art_images = [image.resize(size, Image.NEAREST) for (image, size) in zip(pixel_art_images, original_sizes)]
        tensor_images = [pil2tensor(image) for image in pixel_art_images]
        batch_tensor = torch.cat(tensor_images, dim=0)
        return batch_tensor
```