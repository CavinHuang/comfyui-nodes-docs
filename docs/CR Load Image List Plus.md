# Documentation
- Class name: CR_LoadImageListPlus
- Category: Comfyroll/List/IO
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LoadImageListPlus 是一个用于从指定目录高效加载和处理图像列表的节点。它能够处理大量图像批次，对它们进行排序，并提供文件名和尺寸等附加元数据。该节点旨在简化在 ComfyUI 工作流中进一步处理或显示图像的过程。

# Input types
## Required
- input_folder
    - input_folder 参数指定了将加载图像的目录。对于节点的操作至关重要，因为它决定了图像的来源。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- start_index
    - start_index 参数确定在图像列表中开始加载的起始点。它很重要，因为它允许从列表中选择特定范围的图像。
    - Comfy dtype: INT
    - Python dtype: int
- max_images
    - max_images 参数设置从目录中加载的最大图像数量。它在控制处理批次大小时起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- input_path
    - 可选的 input_path 参数允许指定图像目录的替代路径。如果默认目录不符合用户的要求，它提供了灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE 输出提供了适合进一步处理或分析的加载图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- MASK
    - MASK 输出包括从图像派生的二进制掩码，可用于分割或其他目的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- index
    - index 输出表示每个图像在原始列表中的位置，提供了图像顺序的参考。
    - Comfy dtype: INT
    - Python dtype: List[int]
- filename
    - filename 输出提供了加载图像的名称，这对于识别和记录保持非常有用。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- width
    - width 输出指示图像的宽度，这对于了解加载图像的尺寸至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height 输出指示图像的高度，与宽度相辅相成，以全面了解图像的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- list_length
    - list_length 输出提供了从目录中加载的图像的总数，这对于跟踪数据集的围很重要。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - show_help 输出提供了文档链接，以获取有关如何使用节点的进一步指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LoadImageListPlus:

    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.input_directory
        image_folder = [name for name in os.listdir(input_dir) if os.path.isdir(os.path.join(input_dir, name))]
        return {'required': {'input_folder': (sorted(image_folder),), 'start_index': ('INT', {'default': 0, 'min': 0, 'max': 99999}), 'max_images': ('INT', {'default': 1, 'min': 1, 'max': 99999})}, 'optional': {'input_path': ('STRING', {'default': '', 'multiline': False})}}
    RETURN_TYPES = ('IMAGE', 'MASK', 'INT', 'STRING', 'INT', 'INT', 'INT', 'STRING')
    RETURN_NAMES = ('IMAGE', 'MASK', 'index', 'filename', 'width', 'height', 'list_length', 'show_help')
    OUTPUT_IS_LIST = (True, True, True, True, False, False, False, False)
    FUNCTION = 'make_list'
    CATEGORY = icons.get('Comfyroll/List/IO')

    def make_list(self, start_index, max_images, input_folder, input_path=None, vae=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-image-list-plus'
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
        mask_list = []
        index_list = []
        filename_list = []
        exif_list = []
        start_index = max(0, min(start_index, len(file_list) - 1))
        end_index = min(start_index + max_images, len(file_list) - 1)
        for num in range(start_index, end_index):
            filename = file_list[num]
            img_path = os.path.join(in_path, filename)
            img = Image.open(os.path.join(in_path, file_list[num]))
            image_list.append(pil2tensor(img.convert('RGB')))
            tensor_img = pil2tensor(img)
            mask_list.append(tensor2rgba(tensor_img)[:, :, :, 0])
            index_list.append(num)
            filename_list.append(filename)
        if not image_list:
            print('CR Load Image List: No images found.')
            return None
        (width, height) = Image.open(os.path.join(in_path, file_list[start_index])).size
        images = torch.cat(image_list, dim=0)
        images_out = [images[i:i + 1, ...] for i in range(images.shape[0])]
        masks = torch.cat(mask_list, dim=0)
        mask_out = [masks[i:i + 1, ...] for i in range(masks.shape[0])]
        list_length = end_index - start_index
        return (images_out, mask_out, index_list, filename_list, index_list, width, height, list_length, show_help)
```