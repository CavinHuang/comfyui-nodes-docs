# Documentation
- Class name: ChangeImageBatchSize
- Category: InspirePack/image
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在调整给定图像集的批量大小，确保输出符合指定的批量大小要求。它通过复制最后一个图像以填充批次或根据需要截断批次来实现这一点，具体取决于输入。该节点对于预处理图像数据以满足后续处理步骤的输入要求至关重要。

# Input types
## Required
- image
    - 图像参数代表需要调整大小或调整以满足特定批量大小的一批图像。这是一个关键的输入，因为节点的整个操作都围绕着操纵这些图像数据以实现期望的输出批量大小。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- batch_size
    - 批量大小参数规定了输出批次中期望的图像数量。这是一个关键因素，决定了输入图像的处理方式，无论是通过复制还是截断，以达到指定的大小。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- mode
    - 模式参数决定了调整批量大小所使用的方法。在这种情况下，'简单'模式是唯一支持的选项，它概述了通过复制最后一个图像或截断批次来满足批量大小要求的过程。
    - Comfy dtype: COMBO[simple]
    - Python dtype: str

# Output types
- image
    - 输出图像参数是批量大小调整过程的结果。它包含已调整的图像集，现在符合指定的批量大小，准备进行进一步的处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ChangeImageBatchSize:

    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {'required': {'image': ('IMAGE',), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4096, 'step': 1}), 'mode': (['simple'],)}}
    CATEGORY = 'InspirePack/image'
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'load_image'

    def load_image(self, image, batch_size, mode):
        if mode == 'simple':
            if len(image) < batch_size:
                last_frame = image[-1].unsqueeze(0).expand(batch_size - len(image), -1, -1, -1)
                image = torch.concat((image, last_frame), dim=0)
            else:
                image = image[:batch_size, :, :, :]
            return (image,)
        else:
            print(f'[WARN] ChangeImageBatchSize: Unknown mode `{mode}` - ignored')
            return (image,)
```