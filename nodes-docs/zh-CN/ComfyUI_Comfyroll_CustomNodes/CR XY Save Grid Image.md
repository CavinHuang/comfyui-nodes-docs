# Documentation
- Class name: CR_XYSaveGridImage
- Category: Comfyroll/XY Grid
- Output node: True
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_XYSaveGridImage是一个设计用来将网格图像保存到指定输出目录的节点。它可以处理不同的保存或预览图像模式，并支持多种文件格式。该节点确保每个保存的图像都基于前缀和一个数字计数器唯一命名，便于图像的组织和检索。

# Input types
## Required
- mode
    - 模式参数决定节点是处于'保存'模式以永久保存图像还是'预览'模式以临时保存图像供审查。这个选择影响节点的行为和保存图像的目的地。
    - Comfy dtype: COMBO['Save', 'Preview']
    - Python dtype: str
- output_folder
    - 输出文件夹参数指定了图像将被保存的输出目录内的目录。这对于组织保存的图像并确保它们存储在正确的位置至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- image
    - 图像参数是节点将处理并保存的实际图像数据。它是节点操作的中心输入，因为节点的主要目的是处理这张图像的保存。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- file_format
    - 文件格式参数定义了图像将被保存的格式。它支持各种格式，允许在图像的存储和使用方式上具有灵活性。
    - Comfy dtype: COMBO['webp', 'jpg', 'png', 'tif']
    - Python dtype: str
## Optional
- filename_prefix
    - 文件名前缀参数提供了保存图像文件命名的基础。它与数字计数器结合使用，以确保文件名的唯一性，这对于防止文件覆盖和维护文件组织非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- output_path
    - 输出路径参数允许指定一个自定义路径来保存图像，覆盖默认的输出目录。它提供了对保存图像位置的额外控制。
    - Comfy dtype: STRING
    - Python dtype: str
- trigger
    - 触发器参数是一个布尔标志，当设置为True时，启动图像保存过程。它作为一个控制机制，以确定何时节点应该执行其主要功能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- preview
    - 预览输出提供了保存图像的结构化表示，包括其文件名和位置。这个输出对于在用户界面中显示图像以供审查非常有用。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class CR_XYSaveGridImage:

    def __init__(self):
        self.type = 'output'

    @classmethod
    def INPUT_TYPES(cls):
        output_dir = folder_paths.output_directory
        output_folders = [name for name in os.listdir(output_dir) if os.path.isdir(os.path.join(output_dir, name))]
        return {'required': {'mode': (['Save', 'Preview'],), 'output_folder': (sorted(output_folders),), 'image': ('IMAGE',), 'filename_prefix': ('STRING', {'default': 'CR'}), 'file_format': (['webp', 'jpg', 'png', 'tif'],)}, 'optional': {'output_path': ('STRING', {'default': '', 'multiline': False}), 'trigger': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ()
    FUNCTION = 'save_image'
    OUTPUT_NODE = True
    CATEGORY = icons.get('Comfyroll/XY Grid')

    def save_image(self, mode, output_folder, image, file_format, output_path='', filename_prefix='CR', trigger=False):
        if trigger == False:
            return ()
        output_dir = folder_paths.get_output_directory()
        out_folder = os.path.join(output_dir, output_folder)
        if output_path != '':
            if not os.path.exists(output_path):
                print(f'[Warning] CR Save XY Grid Image: The input_path `{output_path}` does not exist')
                return ('',)
            out_path = output_path
        else:
            out_path = os.path.join(output_dir, out_folder)
        if mode == 'Preview':
            out_path = folder_paths.temp_directory
        print(f'[Info] CR Save XY Grid Image: Output path is `{out_path}`')
        counter = find_highest_numeric_value(out_path, filename_prefix) + 1
        output_image = image[0].cpu().numpy()
        img = Image.fromarray(np.clip(output_image * 255.0, 0, 255).astype(np.uint8))
        output_filename = f'{filename_prefix}_{counter:05}'
        img_params = {'png': {'compress_level': 4}, 'webp': {'method': 6, 'lossless': False, 'quality': 80}, 'jpg': {'format': 'JPEG'}, 'tif': {'format': 'TIFF'}}
        self.type = 'output' if mode == 'Save' else 'temp'
        resolved_image_path = os.path.join(out_path, f'{output_filename}.{file_format}')
        img.save(resolved_image_path, **img_params[file_format])
        print(f'[Info] CR Save XY Grid Image: Saved to {output_filename}.{file_format}')
        out_filename = f'{output_filename}.{file_format}'
        preview = {'ui': {'images': [{'filename': out_filename, 'subfolder': out_path, 'type': self.type}]}}
        return preview
```