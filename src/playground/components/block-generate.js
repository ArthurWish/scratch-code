function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scroll(distance) {
    let element = "#react-tabs-1 > div.gui_blocks-wrapper_oRY_r.box_box_tWy-0 > div > div > svg.blocklyFlyout > g > g.blocklyBlockCanvas";
    let element_selected = document.querySelector(element);
    if (element_selected) {
        element_selected.setAttribute("transform", `translate(0,${distance}) scale(0.675)`);
        await sleep(500);
    } else {
        console.log("not found element")
    }
}

async function clickAndMove(element, X_pos = 500, Y_pos = 500) {
    if (!element) {
        return;
    }
    
    let mouseDownEvent = new MouseEvent('mousedown', {
        clientX: element.getBoundingClientRect().left,
        clientY: element.getBoundingClientRect().top
    });

    // 创建mousemove事件
    let mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: X_pos,
        clientY: Y_pos
    });

    let mouseUpEvent = new MouseEvent('mouseup', {
        clientX: X_pos,
        clientY: Y_pos
    });

    element.dispatchEvent(mouseDownEvent);
    await sleep(50);
    document.dispatchEvent(mouseMoveEvent);
    await sleep(50);

    document.dispatchEvent(mouseUpEvent);

}

async function generateBlock(block_name, X_pos = 500, Y_pos = 500) {
    if (block_name.includes("event")) {
        console.log(block_name);
        await scroll(-2452.3);
    } else if (block_name.includes("sound")) {
        console.log(block_name);
        await scroll(-1966.3);
    } else if (block_name.includes("looks")) {
        console.log(block_name);
        await scroll(-948.4);
    } else if (block_name.includes("repeat") || block_name.includes("control") || block_name.includes("wait")) {
        console.log(block_name);
        await scroll(-2968);
    } else if (block_name.includes("motion")) {
        await scroll(-3);
    }
    let target_block = document.querySelector(`[data-id=${block_name}]`);
    // match some irrgular block ids
    if (target_block == null) {
        target_block = document.querySelector(`[data-id*=${block_name}]`);
    }
    // console.log("target_block", target_block)
    await clickAndMove(target_block, X_pos, Y_pos)
}


async function readDataFromJsonFile(url = 'http://localhost:5000/static/block_suggestion.txt', id) {
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(function (data) {
                if (id in data) {
                    resolve(data[id]); // 将id对应的数据传递给resolve
                  } else {
                    reject(new Error(`No data for id ${id}`));
                  }
                })
            .catch(function (error) {
                console.log('Error:', error.message);
                reject(error); // 将错误传递给reject
            });
    });
}



export {
    generateBlock,
    clickAndMove,
    readDataFromJsonFile
};