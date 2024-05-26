# Documentation
- Class name: LDSRUpscale
- Category: Flowty LDSR
- Output node: False
- Repo Ref: https://github.com/flowtyone/ComfyUI-Flowty-LDSR.git

该节点类封装了对图像执行超分辨率的高级功能，使用LDSR模型来提高图像的分辨率，从而增强图像质量。它旨在提高视觉保真度和细节，同时不损害图像的基本内容。

# Input types
## Required
- upscale_model
    - upscale_model参数至关重要，因为它定义了节点将用于执行超分辨率任务的底层模型。这对于节点的正确功能和产生准确结果至关重要。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: str
- images
    - images参数是节点操作的主要输入，代表需要放大的图像。它的作用至关重要，因为输入的质量和类型直接影响输出的外观和超分辨率过程的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
## Optional
- steps
    - steps参数影响模型在放大过程中执行的迭代次数。它是输出质量和所需计算资源之间的平衡因素。更多的步骤通常会产生更好的结果，但计算成本更高。
    - Comfy dtype: COMBO[25, 50, 100, 250, 500, 1000]
    - Python dtype: int
- pre_downscale
    - pre_downscale参数决定了在超分辨率过程之前应用于输入图像的缩小比例。这对于管理计算负载和内存使用特别有用，尤其是对于非常高分辨率的图像。
    - Comfy dtype: COMBO[None, 1/2, 1/4]
    - Python dtype: str
- post_downscale
    - post_downscale参数在应用超分辨率后决定缩小操作。它有助于控制最终输出的大小，并可用于根据不同的用例或要求优化输出。
    - Comfy dtype: COMBO[None, Original Size, 1/2, 1/4]
    - Python dtype: str
- downsample_method
    - downsample_method参数指定在超分辨率过程之前或之后减小图像大小时使用的下采样技术。它影响调整大小后的图像质量，Lanczos通常提供更好的结果，但计算成本更高。
    - Comfy dtype: COMBO[Nearest, Lanczos]
    - Python dtype: str

# Output types
- images
    - 输出图像是超分辨率过程的结果，展示了增强的细节和改善的视觉保真度。它们是节点的主要输出，直接反映了放大模型和使用的参数的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class LDSRUpscale:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'upscale_model': ('UPSCALE_MODEL',), 'images': ('IMAGE',), 'steps': (['25', '50', '100', '250', '500', '1000'], {'default': '100'}), 'pre_downscale': (['None', '1/2', '1/4'], {'default': 'None'}), 'post_downscale': (['None', 'Original Size', '1/2', '1/4'], {'default': 'None'}), 'downsample_method': (['Nearest', 'Lanczos'], {'default': 'Lanczos'})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('images',)
    FUNCTION = 'upscale'
    CATEGORY = 'Flowty LDSR'

    def upscale(self, upscale_model, images, steps, pre_downscale='None', post_downscale='None', downsample_method='Lanczos'):
        pbar = ProgressBar(int(steps))
        p = {'prev': 0}

        def prog(i):
            i = i + 1
            if i < p['prev']:
                p['prev'] = 0
            pbar.update(i - p['prev'])
            p['prev'] = i
        ldsr = LDSR(model=upscale_model, on_progress=prog)
        outputs = []
        for image in images:
            outputs.append(ldsr.superResolution(image, int(steps), pre_downscale, post_downscale, downsample_method))
        return (torch.stack(outputs),)
```