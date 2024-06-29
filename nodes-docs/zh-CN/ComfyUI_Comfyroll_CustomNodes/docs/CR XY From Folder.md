# Documentation
- Class name: CR_XYFromFolder
- Category: Comfyroll/XY Grid
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_XYFromFolder 节点旨在从指定文件夹处理和组织图片到网格布局中。它通过允许用户为每个图片指定注释、设置字体大小以及控制图片之间的间距，来促进创建一个视觉上结构化的网格。这个节点特别适用于生成用于演示、目录或数据可视化等不同目的的带注释的图片网格。

# Input types
## Required
- image_folder
    - 图片文件夹参数对于定义将组织成网格的图片来源至关重要。它决定了节点检索和处理图片的目录。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- start_index
    - 开始索引是一个可选参数，它决定了选择图片过程的起始点。它允许控制哪些图片被包括在网格中，从特定位置开始。
    - Comfy dtype: INT
    - Python dtype: int
- end_index
    - 结束索引参数指定了选择图片的结束点。它用于定义最终网格布局中将包含的图片范围。
    - Comfy dtype: INT
    - Python dtype: int
- max_columns
    - 最大列数参数决定了网格中的列数。它对于定义网格的结构并确保视觉上的平衡布局至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- x_annotation
    - x_annotation 参数用于为网格的列提供注释。它为图片的视觉表示增加了一层信息和上下文。
    - Comfy dtype: STRING
    - Python dtype: str
- y_annotation
    - y_annotation 参数类似于 x_annotation，但用于网格的行。它确保每一行都被正确地标记和注释。
    - Comfy dtype: STRING
    - Python dtype: str
- font_size
    - 字体大小参数控制注释所用文字的大小。它是节点功能的重要方面，因为它影响网格的可读性和美观性。
    - Comfy dtype: INT
    - Python dtype: int
- gap
    - 间隔参数定义了网格中图片之间的间距。它在整体视觉展示中发挥作用，确保图片不会过于拥挤。
    - Comfy dtype: INT
    - Python dtype: int
- trigger
    - 触发器参数是一个可选的开关，当被激活时，它会启动图片处理和网格创建。它提供了一种控制节点操作何时执行的方式。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- IMAGE
    - IMAGE 输出提供了带有注释的最终图片网格，准备用于各种应用程序。它代表了节点处理和布局工作的成果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- trigger
    - 触发器输出表明节点的操作是否根据输入的触发器执行。它作为节点激活状态的反馈机制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- show_help
    - show_help 输出提供了指向节点文档页面的 URL 链接。它为用户提供了轻松访问有关使用节点的额外信息和指导的途径。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_XYFromFolder:

    @classmethod
    def INPUT_TYPES(cls) -> dict[str, t.Any]:
        input_dir = folder_paths.output_directory
        image_folder = [name for name in os.listdir(input_dir) if os.path.isdir(os.path.join(input_dir, name))]
        return {'required': {'image_folder': (sorted(image_folder),), 'start_index': ('INT', {'default': 1, 'min': 0, 'max': 10000}), 'end_index': ('INT', {'default': 1, 'min': 1, 'max': 10000}), 'max_columns': ('INT', {'default': 1, 'min': 1, 'max': 10000}), 'x_annotation': ('STRING', {'multiline': True}), 'y_annotation': ('STRING', {'multiline': True}), 'font_size': ('INT', {'default': 50, 'min': 1}), 'gap': ('INT', {'default': 0, 'min': 0})}, 'optional': {'trigger': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('IMAGE', 'BOOLEAN', 'STRING')
    RETURN_NAMES = ('IMAGE', 'trigger', 'show_help')
    FUNCTION = 'load_images'
    CATEGORY = icons.get('Comfyroll/XY Grid')

    def load_images(self, image_folder, start_index, end_index, max_columns, x_annotation, y_annotation, font_size, gap, trigger=False):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/XY-Grid-Nodes#cr-xy-from-folder'
        if trigger == False:
            return ((), False, show_help)
        input_dir = folder_paths.output_directory
        image_path = os.path.join(input_dir, image_folder)
        file_list = sorted(os.listdir(image_path), key=lambda s: sum(((s, int(n)) for (s, n) in re.findall('(\\D+)(\\d+)', 'a%s0' % s)), ()))
        sample_frames = []
        pillow_images = []
        if len(file_list) < end_index:
            end_index = len(file_list)
        for num in range(start_index, end_index + 1):
            i = Image.open(os.path.join(image_path, file_list[num - 1]))
            image = i.convert('RGB')
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            image = image.squeeze()
            sample_frames.append(image)
        resolved_font_path = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'fonts\\Roboto-Regular.ttf')
        font = ImageFont.truetype(str(resolved_font_path), size=font_size)
        start_x_ann = start_index % max_columns - 1
        start_y_ann = int(start_index / max_columns)
        column_list = x_annotation.split(';')[start_x_ann:]
        row_list = y_annotation.split(';')[start_y_ann:]
        column_list = [item.strip() for item in column_list]
        row_list = [item.strip() for item in row_list]
        annotation = Annotation(column_texts=column_list, row_texts=row_list, font=font)
        images = torch.stack(sample_frames)
        pillow_images = [tensor_to_pillow(i) for i in images]
        pillow_grid = create_images_grid_by_columns(images=pillow_images, gap=gap, annotation=annotation, max_columns=max_columns)
        tensor_grid = pillow_to_tensor(pillow_grid)
        return (tensor_grid, trigger, show_help)
```