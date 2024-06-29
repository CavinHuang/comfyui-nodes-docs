# Documentation
- Class name: DetailerHookCombine
- Category: PixelKSampleHookCombine
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

DetailerHookCombine节点在像素级采样过程中充当两个独立钩子的协调器。它确保每个钩子依次应用于潜在空间、分割和粘贴图像，从而增强生成输出的细节和一致性。

# Input types
## Required
- latent
    - “latent”参数表示正在处理的潜在空间向量。它是一个关键组件，因为它携带了细节增强过程所需的编码信息。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- segs
    - “segs”参数是用于细化图像细节的分割张量列表。列表中的每个张量对应图像的不同部分。
    - Comfy dtype: List[torch.Tensor]
    - Python dtype: List[torch.Tensor]
- image
    - “image”参数是代表将要进行进一步处理以增强其视觉细节的粘贴图像的张量。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Output types
- cycled_latent
    - “cycled_latent”输出是将两个钩子应用于输入潜在向量的结果，旨在提高潜在表示中的细节水平。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- refined_segs
    - “refined_segs”输出由两个钩子处理过的分割张量组成，以实现对图像进行更详细和准确的分割。
    - Comfy dtype: List[torch.Tensor]
    - Python dtype: List[torch.Tensor]
- processed_image
    - “processed_image”输出是在两个钩子增强后的最终图像张量，结果是具有改进视觉质量和细节的图像。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class DetailerHookCombine(PixelKSampleHookCombine):

    def cycle_latent(self, latent):
        latent = self.hook1.cycle_latent(latent)
        latent = self.hook2.cycle_latent(latent)
        return latent

    def post_detection(self, segs):
        segs = self.hook1.post_detection(segs)
        segs = self.hook2.post_detection(segs)
        return segs

    def post_paste(self, image):
        image = self.hook1.post_paste(image)
        image = self.hook2.post_paste(image)
        return image
```