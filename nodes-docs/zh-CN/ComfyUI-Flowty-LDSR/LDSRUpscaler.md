# Documentation
- Class name: LDSRUpscaler
- Category: Flowty LDSR
- Output node: False
- Repo Ref: https://github.com/flowtyone/ComfyUI-Flowty-LDSR.git

LDSRUpscaler节点的'upscale'方法旨在使用预训练模型增强输入图像的分辨率。它利用LDSR算法的能力执行超分辨率，即在保持或提高图像质量的同时增加图像的空间分辨率。该方法特别适用于放大具有高度细节的图像，如照片或数字艺术作品。

# Input types
## Required
- model
    - ‘model’参数是用于放大的预训练模型的路径。它对节点的功能至关重要，因为它决定了将应用于输入图像进行超分辨率的特定模型权重和架构。
    - Comfy dtype: STRING
    - Python dtype: str
- images
    - ‘images’参数是节点将处理以进行放大的图像集合。这个输入是必不可少的，因为它代表了将由节点转换以实现更高分辨率的数据。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]
- steps
    - ‘steps’参数定义了超分辨率过程中使用的扩散步骤数。它影响放大图像的质量和计算时间。更多的步骤通常可以带来更好的结果，但也会延长处理时间。
    - Comfy dtype: INT
    - Python dtype: int
- pre_downscale
    - ‘pre_downscale’参数指定在超分辨率过程之前是否以及多少比例缩小图像。这是一个可选设置，可用于控制输入图像的初始分辨率。
    - Comfy dtype: STRING
    - Python dtype: str
- post_downscale
    - ‘post_downscale’参数确定在超分辨率过程之后是否以及如何缩小图像。它允许控制输出图像的最终分辨率。
    - Comfy dtype: STRING
    - Python dtype: str
- downsample_method
    - ‘downsample_method’参数选择在调整图像大小时使用的缩小算法。它可能影响缩小图像的质量，选项通常包括‘Nearest’或‘Lanczos’。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- images
    - ‘images’输出参数包含超分辨率过程产生的放大图像。这些是节点执行的主要结果，代表了具有增加分辨率的转换数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class LDSRUpscaler:

    @classmethod
    def INPUT_TYPES(s):
        model_list = get_filename_list('upscale_models')
        candidates = [name for name in model_list if 'last.ckpt' in name]
        if len(candidates) > 0:
            default_path = candidates[0]
        else:
            default_path = 'last.ckpt'
        return {'required': {'model': (model_list, {'default': default_path}), 'images': ('IMAGE',), 'steps': (['25', '50', '100', '250', '500', '1000'], {'default': '100'}), 'pre_downscale': (['None', '1/2', '1/4'], {'default': 'None'}), 'post_downscale': (['None', 'Original Size', '1/2', '1/4'], {'default': 'None'}), 'downsample_method': (['Nearest', 'Lanczos'], {'default': 'Lanczos'})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('images',)
    FUNCTION = 'upscale'
    CATEGORY = 'Flowty LDSR'

    def upscale(self, model, images, steps, pre_downscale='None', post_downscale='None', downsample_method='Lanczos'):
        model_path = get_full_path('upscale_models', model)
        pbar = ProgressBar(int(steps))
        p = {'prev': 0}

        def prog(i):
            i = i + 1
            if i < p['prev']:
                p['prev'] = 0
            pbar.update(i - p['prev'])
            p['prev'] = i
        ldsr = LDSR(modelPath=model_path, torchdevice=get_torch_device(), on_progress=prog)
        outputs = []
        for image in images:
            outputs.append(ldsr.superResolution(image, int(steps), pre_downscale, post_downscale, downsample_method))
        return (torch.stack(outputs),)
```