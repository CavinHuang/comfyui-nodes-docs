【思考】我将按照要求,对原文进行四轮翻译流程。首先参考Example,然后进行翻译,之后进行校审,最后定稿。我会特别注意保持markdown格式,并使用现代白话文翻译。

【翻译】


# Documentation
- Class name: AV_FaceDetailerPipe
- Category: ArtVenture/Detailer
- Output node: False

AV_FaceDetailerPipe节点是ArtVenture/Detailer类别中的一个组件,用于增强图像中的面部细节。它通过一个可选的启用标志来控制其操作。该节点在FaceDetailerPipe功能的基础上进行了扩展,为艺术作品或照片中的面部特征提供了专门的细节优化方法。

# Input types
## Required
- image
    - 输入的图像数据,将在此基础上进行面部细节增强。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- detailer_pipe
    - 用于细节增强的管道对象,包含了处理图像所需的各种组件和设置。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: unknown
- guide_size
    - 指导尺寸参数,用于控制细节增强过程中的某些尺度相关设置。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- guide_size_for
    - 布尔值,指定guide_size参数的应用方式。
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown
- max_size
    - 处理图像时允许的最大尺寸,用于限制计算资源的使用。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- seed
    - 随机种子,用于确保处理结果的可重复性。
    - Comfy dtype: INT
    - Python dtype: unknown
- steps
    - 处理过程中的迭代步数,影响细节增强的程度和质量。
    - Comfy dtype: INT
    - Python dtype: unknown
- cfg
    - 配置参数,用于调整处理过程中的各种设置。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- sampler_name
    - 采样器的名称,用于选择特定的采样算法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- scheduler
    - 调度器的选择,用于控制处理过程中的资源分配。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- denoise
    - 去噪参数,控制去除图像噪声的程度。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- feather
    - 羽化参数,用于平滑处理区域的边缘。
    - Comfy dtype: INT
    - Python dtype: unknown
- noise_mask
    - 是否使用噪声遮罩的布尔值。
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown
- force_inpaint
    - 强制使用修复功能的布尔值。
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown
- bbox_threshold
    - 边界框检测的阈值,用于确定面部区域。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- bbox_dilation
    - 边界框扩张参数,用于调整检测到的面部区域大小。
    - Comfy dtype: INT
    - Python dtype: unknown
- bbox_crop_factor
    - 边界框裁剪因子,用于调整最终处理区域的大小。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- sam_detection_hint
    - SAM(Segment Anything Model)检测提示,用于辅助面部区域分割。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- sam_dilation
    - SAM分割结果的扩张参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- sam_threshold
    - SAM分割的阈值参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- sam_bbox_expansion
    - SAM边界框扩展参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- sam_mask_hint_threshold
    - SAM遮罩提示的阈值参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- sam_mask_hint_use_negative
    - 是否使用SAM负面遮罩提示的选项。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- drop_size
    - 丢弃小于该尺寸的处理区域。
    - Comfy dtype: INT
    - Python dtype: unknown
- refiner_ratio
    - 细化器的比率参数,用于控制细节增强的程度。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- cycle
    - 处理循环的次数。
    - Comfy dtype: INT
    - Python dtype: unknown
## Optional
- inpaint_model
    - 是否使用修复模型的布尔值。
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown
- noise_mask_feather
    - 噪声遮罩的羽化参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- enabled
    - 'enabled'参数控制是否激活面部细节处理过程。当设置为True时,节点会对输入图像进行面部细节处理;当设置为False时,它会跳过细节处理过程并返回原始图像。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- image
    - 输出图像,可能是原始图像或经过面部细节增强的版本,具体取决于'enabled'参数的设置。
    - Comfy dtype: IMAGE
    - Python dtype: Image
- cropped_refined
    - 经过细化处理的裁剪图像。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- cropped_enhanced_alpha
    - 带有增强alpha通道的裁剪图像。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- mask
    - 处理过程中生成的遮罩。
    - Comfy dtype: MASK
    - Python dtype: unknown
- detailer_pipe
    - 用于细节处理的管道对象。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: unknown
- cnet_images
    - 控制网络生成的图像。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- ui
    - 反映节点处理状态和结果的UI组件,根据操作结果动态生成。


【思考】我已经完成了初步翻译,下面我将进行校审,确保译文准确、流畅,并符合现代汉语表达习惯。

【校审】经过校审,我认为译文整体质量良好,符合原文意思且表达流畅。但仍有一些小细节可以优化:

1. 在"Documentation"部分,可以更简洁地描述节点的功能。
2. 一些技术术语的翻译可以保留英文原文,以便读者对照理解。
3. 部分描述可以更加口语化,使文本更易读。

我将在定稿时对这些方面进行调整。

【思考】现在我将进行最后一轮校审,重点检查markdown格式是否符合要求,以及是否有任何遗漏或错误。

【校审】经过最后一轮校审,我确认markdown格式符合要求,内容完整无误。现在我将进行最终定稿。

【定稿】


# Documentation
- Class name: AV_FaceDetailerPipe
- Category: ArtVenture/Detailer
- Output node: False

AV_FaceDetailerPipe节点是ArtVenture/Detailer类别中的一个组件,专门用于增强图像中的面部细节。它在FaceDetailerPipe的基础上进行了扩展,提供了更专业的面部特征细节优化方法。该节点通过一个可选的启用标志来控制其操作,让用户可以灵活地决定是否应用面部细节增强。

# Input types
## Required
- image
    - 需要进行面部细节增强的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- detailer_pipe
    - 包含处理图像所需各种组件和设置的细节增强管道对象。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: unknown
- guide_size
    - 控制细节增强过程中尺度相关设置的指导参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- guide_size_for
    - 决定guide_size参数应用方式的布尔值。
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown
- max_size
    - 限制图像处理时最大尺寸的参数,用于控制计算资源使用。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- seed
    - 确保处理结果可重复性的随机种子。
    - Comfy dtype: INT
    - Python dtype: unknown
- steps
    - 影响细节增强程度和质量的处理迭代步数。
    - Comfy dtype: INT
    - Python dtype: unknown
- cfg
    - 用于调整处理过程各种设置的配置参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- sampler_name
    - 选择特定采样算法的采样器名称。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- scheduler
    - 控制处理过程中资源分配的调度器选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- denoise
    - 控制图像去噪程度的参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- feather
    - 用于平滑处理区域边缘的羽化参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- noise_mask
    - 决定是否使用噪声遮罩的布尔值。
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown
- force_inpaint
    - 是否强制使用修复(inpaint)功能的布尔值。
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown
- bbox_threshold
    - 用于确定面部区域的边界框检测阈值。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- bbox_dilation
    - 用于调整检测到的面部区域大小的边界框扩张参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- bbox_crop_factor
    - 用于调整最终处理区域大小的边界框裁剪因子。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- sam_detection_hint
    - 辅助面部区域分割的SAM(Segment Anything Model)检测提示。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- sam_dilation
    - SAM分割结果的扩张参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- sam_threshold
    - SAM分割的阈值参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- sam_bbox_expansion
    - SAM边界框扩展参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- sam_mask_hint_threshold
    - SAM遮罩提示的阈值参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- sam_mask_hint_use_negative
    - 是否使用SAM负面遮罩提示的选项。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- drop_size
    - 小于该尺寸的处理区域将被丢弃的参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- refiner_ratio
    - 控制细节增强程度的细化器比率参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- cycle
    - 处理循环的次数。
    - Comfy dtype: INT
    - Python dtype: unknown
## Optional
- inpaint_model
    - 是否使用修复(inpaint)模型的布尔值。
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown
- noise_mask_feather
    - 噪声遮罩的羽化参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- enabled
    - 控制是否激活面部细节处理过程的参数。True时进行处理,False时返回原图。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- image
    - 输出的图像,可能是原图或经过面部细节增强的版本,取决于'enabled'参数设置。
    - Comfy dtype: IMAGE
    - Python dtype: Image
- cropped_refined
    - 经过细化处理的裁剪图像。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- cropped_enhanced_alpha
    - 带有增强alpha通道的裁剪图像。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- mask
    - 处理过程中生成的遮罩。
    - Comfy dtype: MASK
    - Python dtype: unknown
- detailer_pipe
    - 用于细节处理的管道对象。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: unknown
- cnet_images
    - 控制网络生成的图像。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- ui
    - 根据操作结果动态生成的UI组件,反映节点处理状态和结果。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class AV_FaceDetailerPipe(FaceDetailerPipe):
        @classmethod
        def INPUT_TYPES(s):
            inputs = FaceDetailerPipe.INPUT_TYPES()
            inputs["optional"]["enabled"] = (
                "BOOLEAN",
                {"default": True, "label_on": "enabled", "label_off": "disabled"},
            )
            return inputs

        CATEGORY = "ArtVenture/Detailer"

        def doit(self, image, detailer_pipe, *args, enabled=True, **kwargs):
            if enabled:
                return super().doit(image, detailer_pipe, *args, **kwargs)
            else:
                return (image, [], [], None, detailer_pipe, [])

```
