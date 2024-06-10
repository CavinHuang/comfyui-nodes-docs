# Documentation
- Class name: MiDaS_Background_Foreground_Removal
- Category: WAS Suite/Image/AI
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

该节点使用MiDaS模型从图像中估计深度，并根据用户输入移除背景或前景，增强图像的视觉清晰度和焦点。

# Input types
## Required
- image
    - 源图像，从中估计深度并移除背景或前景。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- midas_model
    - 指定用于深度估计的MiDaS模型的大小，较大的模型通常能提供更准确的结果，但需要更多的计算资源。
    - Comfy dtype: COMBO[ ['DPT_Large', 'DPT_Hybrid', 'DPT_Small' ]]
    - Python dtype: str
- remove
    - 指示应从图像中移除背景还是前景，影响输出的构图。
    - Comfy dtype: COMBO[ ['background', 'foreground' ]]
    - Python dtype: str
## Optional
- use_cpu
    - 决定是否使用CPU进行处理。卸载到GPU通常更快，但需要兼容的硬件。
    - Comfy dtype: COMBO[ ['false', 'true' ]]
    - Python dtype: str
- threshold
    - 对深度图应用阈值，可以细化移除元素与图像其余部分的分离。
    - Comfy dtype: COMBO[ ['false', 'true' ]]
    - Python dtype: str
- threshold_low
    - 设置深度值阈值范围的下限，影响分割的精度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- threshold_mid
    - 定义阈值范围的中点，进一步调整保留和移除的图像部分之间的过渡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- threshold_high
    - 建立阈值范围的上限，这可以影响移除过程中图像最深处的处理方式。
    - Comfy dtype: FLOAT
    - Python dtype: float
- smoothing
    - 控制应用于深度图的平滑程度，这有助于减少最终输出中的噪声和伪影。
    - Comfy dtype: FLOAT
    - Python dtype: float
- background_red
    - 设置用于填充移除区域的背景颜色的红色分量，影响结果图像的视觉外观。
    - Comfy dtype: INT
    - Python dtype: int
- background_green
    - 确定背景颜色的绿色分量，有助于构成移除元素区域的整体色彩方案。
    - Comfy dtype: INT
    - Python dtype: int
- background_blue
    - 指定背景颜色的蓝色分量，用于在编辑图像中实现期望的色彩平衡。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result_image
    - 处理后的图像，已移除指定的背景或前景元素，可供进一步使用或分析。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- depth_map
    - 从输入图像派生出的深度图，视觉上表示场景中的估计距离，并在内部用于移除过程。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: GPU

# Source code
```
class MiDaS_Background_Foreground_Removal:

    def __init__(self):
        self.midas_dir = os.path.join(MODELS_DIR, 'midas')

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'use_cpu': (['false', 'true'],), 'midas_model': (['DPT_Large', 'DPT_Hybrid', 'DPT_Small'],), 'remove': (['background', 'foregroud'],), 'threshold': (['false', 'true'],), 'threshold_low': ('FLOAT', {'default': 10, 'min': 0, 'max': 255, 'step': 1}), 'threshold_mid': ('FLOAT', {'default': 200, 'min': 0, 'max': 255, 'step': 1}), 'threshold_high': ('FLOAT', {'default': 210, 'min': 0, 'max': 255, 'step': 1}), 'smoothing': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 16.0, 'step': 0.01}), 'background_red': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1}), 'background_green': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1}), 'background_blue': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'IMAGE')
    FUNCTION = 'midas_remove'
    CATEGORY = 'WAS Suite/Image/AI'

    def midas_remove(self, image, midas_model, use_cpu='false', remove='background', threshold='false', threshold_low=0, threshold_mid=127, threshold_high=255, smoothing=0.25, background_red=0, background_green=0, background_blue=0):
        global MIDAS_INSTALLED
        if not MIDAS_INSTALLED:
            self.install_midas()
        import cv2 as cv
        i = 255.0 * image.cpu().numpy().squeeze()
        img = i
        img_original = tensor2pil(image).convert('RGB')
        cstr('Downloading and loading MiDaS Model...').msg.print()
        torch.hub.set_dir(self.midas_dir)
        midas = torch.hub.load('intel-isl/MiDaS', midas_model, trust_repo=True)
        device = torch.device('cuda') if torch.cuda.is_available() and use_cpu == 'false' else torch.device('cpu')
        cstr(f'MiDaS is using device: {device}').msg.print()
        midas.to(device).eval()
        midas_transforms = torch.hub.load('intel-isl/MiDaS', 'transforms')
        if midas_model == 'DPT_Large' or midas_model == 'DPT_Hybrid':
            transform = midas_transforms.dpt_transform
        else:
            transform = midas_transforms.small_transform
        img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
        input_batch = transform(img).to(device)
        cstr('Approximating depth from image.').msg.print()
        with torch.no_grad():
            prediction = midas(input_batch)
            prediction = torch.nn.functional.interpolate(prediction.unsqueeze(1), size=img.shape[:2], mode='bicubic', align_corners=False).squeeze()
        if remove == 'foreground':
            depth = 255 - prediction.cpu().numpy().astype(np.uint8)
            depth = depth.astype(np.float32)
        else:
            depth = prediction.cpu().numpy().astype(np.float32)
        depth = depth * 255 / np.max(depth) / 255
        depth = Image.fromarray(np.uint8(depth * 255))
        if threshold == 'true':
            levels = self.AdjustLevels(threshold_low, threshold_mid, threshold_high)
            depth = levels.adjust(depth.convert('RGB')).convert('L')
        if smoothing > 0:
            depth = depth.filter(ImageFilter.GaussianBlur(radius=smoothing))
        depth = depth.resize(img_original.size).convert('L')
        background_red = int(background_red) if isinstance(background_red, (int, float)) else 0
        background_green = int(background_green) if isinstance(background_green, (int, float)) else 0
        background_blue = int(background_blue) if isinstance(background_blue, (int, float)) else 0
        background_color = (background_red, background_green, background_blue)
        background = Image.new(mode='RGB', size=img_original.size, color=background_color)
        result_img = Image.composite(img_original, background, depth)
        del midas, device, midas_transforms
        del transform, img, img_original, input_batch, prediction
        return (pil2tensor(result_img), pil2tensor(depth.convert('RGB')))

    class AdjustLevels:

        def __init__(self, min_level, mid_level, max_level):
            self.min_level = min_level
            self.mid_level = mid_level
            self.max_level = max_level

        def adjust(self, im):
            im_arr = np.array(im)
            im_arr[im_arr < self.min_level] = self.min_level
            im_arr = (im_arr - self.min_level) * (255 / (self.max_level - self.min_level))
            im_arr[im_arr < 0] = 0
            im_arr[im_arr > 255] = 255
            im_arr = im_arr.astype(np.uint8)
            im = Image.fromarray(im_arr)
            im = ImageOps.autocontrast(im, cutoff=self.max_level)
            return im

    def install_midas(self):
        global MIDAS_INSTALLED
        if 'timm' not in packages():
            install_package('timm')
        MIDAS_INSTALLED = True
```