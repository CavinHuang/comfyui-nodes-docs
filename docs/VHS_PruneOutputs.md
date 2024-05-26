# Documentation
- Class name: PruneOutputs
- Category: Video Helper Suite 🎥🅥🅗🅢
- Output node: True
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

方法 'prune_outputs' 旨在管理和清理视频处理工作流中生成的中间和实用文件。它根据指定的选项智能决定删除哪些文件，确保目录结构保持有序，并且只保留必要的文件。

# Input types
## Required
- filenames
    - 参数 'filenames' 是一个包含文件名的列表，节点将对其进行操作。它在识别要修剪的文件中起着关键作用。节点使用此列表来确定其操作的范围并执行文件删除过程。
    - Comfy dtype: List[str]
    - Python dtype: List[str]
- options
    - 参数 'options' 决定了节点的修剪行为。它指定是否删除中间文件、实用文件或两者。此参数至关重要，因为它指导节点关于要删除哪些文件的决策过程。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- None
    - 方法 'prune_outputs' 不产生任何输出，因为它的主要功能是删除文件。它是一个实用方法，专注于维护文件系统的清洁和组织，而不是生成新数据或结果。
    - Comfy dtype: NoneType
    - Python dtype: NoneType

# Usage tips
- Infra type: CPU

# Source code
```
class PruneOutputs:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'filenames': ('VHS_FILENAMES',), 'options': (['Intermediate', 'Intermediate and Utility'],)}}
    RETURN_TYPES = ()
    OUTPUT_NODE = True
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢'
    FUNCTION = 'prune_outputs'

    def prune_outputs(self, filenames, options):
        if len(filenames[1]) == 0:
            return ()
        assert len(filenames[1]) <= 3 and len(filenames[1]) >= 2
        delete_list = []
        if options in ['Intermediate', 'Intermediate and Utility', 'All']:
            delete_list += filenames[1][1:-1]
        if options in ['Intermediate and Utility', 'All']:
            delete_list.append(filenames[1][0])
        if options in ['All']:
            delete_list.append(filenames[1][-1])
        output_dirs = [os.path.abspath('output'), os.path.abspath('temp')]
        for file in delete_list:
            if os.path.commonpath([output_dirs[0], file]) != output_dirs[0] and os.path.commonpath([output_dirs[1], file]) != output_dirs[1]:
                raise Exception('Tried to prune output from invalid directory: ' + file)
            if os.path.exists(file):
                os.remove(file)
        return ()
```