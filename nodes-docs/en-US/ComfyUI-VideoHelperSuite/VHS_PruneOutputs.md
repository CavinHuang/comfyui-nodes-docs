---
tags:
- Multimedia
- VideoHelperSuite
---

# Prune Outputs 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_PruneOutputs`
- Category: `Video Helper Suite 🎥🅥🅗🅢`
- Output node: `True`

The `VHS_PruneOutputs` node is designed to selectively delete files based on specified criteria, aiming to streamline the output directory by removing intermediate or unnecessary files. This functionality is crucial for managing disk space and organizing project outputs more efficiently.
## Input types
### Required
- **`filenames`**
    - Specifies the filenames to consider for pruning. The selection criteria applied to these filenames determine which files are deleted, impacting the node's execution and the cleanup of the output directory.
    - Comfy dtype: `VHS_FILENAMES`
    - Python dtype: `Tuple[str, ...]`
- **`options`**
    - Defines the criteria for pruning files, such as deleting only intermediate files, both intermediate and utility files, or all specified files. This option directly influences which files are pruned, tailoring the cleanup process to the user's needs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PruneOutputs:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "filenames": ("VHS_FILENAMES",),
                    "options": (["Intermediate", "Intermediate and Utility"],)
                    }
                }

    RETURN_TYPES = ()
    OUTPUT_NODE = True
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢"
    FUNCTION = "prune_outputs"

    def prune_outputs(self, filenames, options):
        if len(filenames[1]) == 0:
            return ()
        assert(len(filenames[1]) <= 3 and len(filenames[1]) >= 2)
        delete_list = []
        if options in ["Intermediate", "Intermediate and Utility", "All"]:
            delete_list += filenames[1][1:-1]
        if options in ["Intermediate and Utility", "All"]:
            delete_list.append(filenames[1][0])
        if options in ["All"]:
            delete_list.append(filenames[1][-1])

        output_dirs = [os.path.abspath("output"), os.path.abspath("temp")]
        for file in delete_list:
            #Check that path is actually an output directory
            if (os.path.commonpath([output_dirs[0], file]) != output_dirs[0]) \
                    and (os.path.commonpath([output_dirs[1], file]) != output_dirs[1]):
                        raise Exception("Tried to prune output from invalid directory: " + file)
            if os.path.exists(file):
                os.remove(file)
        return ()

```
