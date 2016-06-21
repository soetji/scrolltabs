// const tabs = ['aaa asset name', 'bbb asset name', 'ccc asset name', 'ddd asset name', 'eee asset name', 'fff asset name', 'ggg asset name', 'hhh asset name', 'iii asset name', 'jjj asset name', 'kkk asset name', 'lll asset name', 'mmm asset name', 'nnn asset name'];

const tabs = [{label: 'aaa asset name', icon: '', count: ''}, {label: 'bbb asset name', icon: '', count: ''}, {label: 'ccc asset name', icon: '', count: ''}, {label: 'ddd asset name', icon: '', count: ''}, {label: 'eee asset name', icon: '', count: ''}, {label: 'fff asset name', icon: '', count: ''}, {label: 'ggg asset name', icon: '', count: ''}, {label: 'hhh asset name', icon: '', count: ''}, {label: 'iii asset name', icon: '', count: ''}, {label: 'jjj asset name', icon: '', count: ''}, {label: 'kkk asset name', icon: '', count: ''}, {label: 'lll asset name', icon: '', count: ''}, {label: 'mmm asset name', icon: '', count: ''}, {label: 'nnn asset name', icon: '', count: ''}];

function handleTabClick (tab) {
    console.log(tab);
}

function renderTabContent (tab) {
    return <span>{tab.label}</span>;
}

ReactDOM.render(
    <ScrollTabs tabs={tabs}
        tabMinWidth={100}
        selectedIndex={8}
        renderTabContent={renderTabContent}
        handleTabClick={handleTabClick}
    />,
    document.getElementById('main')
);
