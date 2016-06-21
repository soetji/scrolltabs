// const tabs = ['aaa asset name', 'bbb asset name', 'ccc asset name', 'ddd asset name', 'eee asset name', 'fff asset name', 'ggg asset name', 'hhh asset name', 'iii asset name', 'jjj asset name', 'kkk asset name', 'lll asset name', 'mmm asset name', 'nnn asset name'];

const tabs = [{label: 'aaa asset name', count: '1'}, {label: 'bbb asset name', count: '22'}, {label: 'ccc asset name', count: '333'}, {label: 'ddd asset name', count: ''}, {label: 'eee asset name', count: ''}, {label: 'fff asset name', count: ''}, {label: 'ggg asset name', count: ''}, {label: 'hhh asset name', count: ''}, {label: 'iii asset name', count: ''}, {label: 'jjj asset name', count: ''}, {label: 'kkk asset name', count: ''}, {label: 'lll asset name', count: ''}, {label: 'mmm asset name', count: ''}, {label: 'nnn asset name', count: ''}];

function handleTabClick (tab) {
    console.log(tab);
}

function renderTabContent (tab) {
    return <span><span className='label'>{tab.label}</span><span className='count'>{tab.count}</span></span>;
}

function renderMoreTabContent (tab) {
    return <span className='tab'><span className='label'>{tab.label}</span><span className='count-container'><span className='count'>{tab.count}</span></span></span>;
}

ReactDOM.render(
    <ScrollTabs tabs={tabs}
        tabMinWidth={100}
        selectedIndex={8}
        renderTabContent={renderTabContent}
        renderMoreTabContent={renderMoreTabContent}
        handleTabClick={handleTabClick}
    />,
    document.getElementById('main')
);
