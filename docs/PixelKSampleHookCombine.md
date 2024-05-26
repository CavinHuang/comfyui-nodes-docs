# Documentation
- Class name: PixelKSampleHookCombine
- Category: image_processing
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

PixelKSampleHookCombine 是一个节点，旨在将两个独立的钩子顺序应用于一系列图像处理操作。它协调钩子以特定顺序预处理、解码、放大和编码像素数据，确保图像操作任务的协同工作流程。

# Input types
## Required
- hook1
    - 第一个要顺序应用的钩子。它在图像处理的初始阶段起着至关重要的作用，为后续操作奠定基础。
    - Comfy dtype: PixelKSampleHook
    - Python dtype: PixelKSampleHook
- hook2
    - 第二个要顺序应用的钩子，它在第一个钩子应用后进一步细化图像处理流水线，提高整体输出质量。
    - Comfy dtype: PixelKSampleHook
    - Python dtype: PixelKSampleHook

# Output types
- processed_pixels
    - PixelKSampleHookCombine 节点的输出是将两个钩子应用于输入像素数据后的结果。它代表了所有处理步骤完成后图像的最终状态。
    - Comfy dtype: COMBO[str, torch.Tensor]
    - Python dtype: Union[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class PixelKSampleHookCombine(PixelKSampleHook):
    hook1 = None
    hook2 = None

    def __init__(self, hook1, hook2):
        super().__init__()
        self.hook1 = hook1
        self.hook2 = hook2

    def set_steps(self, info):
        self.hook1.set_steps(info)
        self.hook2.set_steps(info)

    def pre_decode(self, samples):
        return self.hook2.pre_decode(self.hook1.pre_decode(samples))

    def post_decode(self, pixels):
        return self.hook2.post_decode(self.hook1.post_decode(pixels))

    def post_upscale(self, pixels):
        return self.hook2.post_upscale(self.hook1.post_upscale(pixels))

    def post_encode(self, samples):
        return self.hook2.post_encode(self.hook1.post_encode(samples))

    def post_crop_region(self, w, h, item_bbox, crop_region):
        crop_region = self.hook1.post_crop_region(w, h, item_bbox, crop_region)
        return self.hook2.post_crop_region(w, h, item_bbox, crop_region)

    def touch_scaled_size(self, w, h):
        (w, h) = self.hook1.touch_scaled_size(w, h)
        return self.hook2.touch_scaled_size(w, h)

    def pre_ksample(self, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, upscaled_latent, denoise):
        (model, seed, steps, cfg, sampler_name, scheduler, positive, negative, upscaled_latent, denoise) = self.hook1.pre_ksample(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, upscaled_latent, denoise)
        return self.hook2.pre_ksample(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, upscaled_latent, denoise)
```