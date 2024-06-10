# Documentation
- Class name: CR_LoadImageList
- Category: Comfyroll/List/IO
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LoadImageList 是一个用于从指定目录加载和处理图像文件列表的节点。它提供基于起始索引和要加载的最大图像数量检索图像子集的功能，确保操作高效并满足用户需求。该节点的主要目标是在 ComfyUI 框架内简化图像加载过程，以便进行进一步的操作或分析。

# Input types
## Required
- input_folder
    - input_folder 参数指定包含要加载图像的目录。它在确定节点将操作的图像列表的范围中起着关键作用，因此直接影响节点的执行和生成的图像列表。
    - Comfy dtype: STRING
    - Python dtype: str
- start_index
    - start_index 参数指示节点将从中开始加载图像的排序后的图像列表中的位置。它对于控制要处理的图像子集至关重要，允许对图像序列进行精确操作。
    - Comfy dtype: INT
    - Python dtype: int
- max_images
    - max_images 参数设置节点将从指定的 start_index 开始加载的最大图像数量。它是一个关键参数，用于限制图像列表的大小，确保节点的操作针对性能和资源管理进行了优化。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- input_path
    - 可选的 input_path 参数允许用户指定一个自定义路径到图像目录，覆盖默认的输入目录。这提供了在选择图像列表来源方面的灵活性，并且可以用来整合来自不同位置的图像。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE 输出提供已加载的图像数据作为张量，可以在 ComfyUI 框架内进一步处理或分析。它代表了 CR_LoadImageList 节点的主要输出，体现了节点加载和准备图像的核心功能。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个指向文档页面的 URL 链接，以供进一步的指导和帮助。它是用户寻求如何有效使用节点的更多信息的有用资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LoadImageList:

    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.input_directory
        image_folder = [name for name in os.listdir(input_dir) if os.path.isdir(os.path.join(input_dir, name))]
        return {'required': {'input_folder': (sorted(image_folder),), 'start_index': ('INT', {'default': 0, 'min': 0, 'max': 9999}), 'max_images': ('INT', {'default': 1, 'min': 1, 'max': 9999})}, 'optional': {'input_path': ('STRING', {'default': '', 'multiline': False})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = 'make_list'
    CATEGORY = icons.get('Comfyroll/List/IO')

    def make_list(self, start_index, max_images, input_folder, input_path=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-image-list'
        if input_path != '' and input_path is not None:
            if not os.path.exists(input_path):
                print(f'[Warning] CR Image List: The input_path `{input_path}` does not exist')
                return ('',)
            in_path = input_path
        else:
            input_dir = folder_paths.input_directory
            in_path = os.path.join(input_dir, input_folder)
        if not os.listdir(in_path):
            print(f'[Warning] CR Image List: The folder `{in_path}` is empty')
            return None
        file_list = sorted(os.listdir(in_path), key=lambda s: sum(((s, int(n)) for (s, n) in re.findall('(\\D+)(\\d+)', 'a%s0' % s)), ()))
        image_list = []
        start_index = max(0, min(start_index, len(file_list) - 1))
        end_index = min(start_index + max_images, len(file_list) - 1)
        for num in range(start_index, end_index):
            img = Image.open(os.path.join(in_path, file_list[num]))
            image = img.convert('RGB')
            image_list.append(pil2tensor(image))
        if not image_list:
            print('CR Load Image List: No images found.')
            return None
        images = torch.cat(image_list, dim=0)
        images_out = [images[i:i + 1, ...] for i in range(images.shape[0])]
        return (images_out, show_help)
```